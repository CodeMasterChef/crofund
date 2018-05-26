pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract CampaignFactory {
    
    struct CampaignObj { 
        uint categoryId;   
        address campaignAddress;
    }
    
    // address[] public deployedCampaigns;
    string[] public categories = ["Games", "Art", "Film", "Technology", "Vehicle"];
    CampaignObj[] public campaignList;
    
    function createCampaign(uint minimum, uint _categoryId, string description, string name, string imageUrl) public {
        address newCampaign = new Campaign(minimum , msg.sender, _categoryId, description, name, imageUrl);
        // deployedCampaigns.push(newCampaign);
        
        CampaignObj memory newCampaignObj = CampaignObj({
            categoryId : _categoryId,
            campaignAddress: newCampaign
        });
        campaignList.push(newCampaignObj);
        
    }
    
    // function getDeployedCampaigns() public view returns (CampaignObj[]) {
    //     return campaignList;
    // }
    
    function getAllCategories() public view returns (string[]) {
        return categories;
    }

    function getCampaignListCount() public view returns (uint) {
        return campaignList.length;
    }
    
    // function getCampaignsByCategoryId(uint _categoryId) public view returns(CampaignObj[]) {
    //     CampaignObj[] storage _campaignList;
    //     for(uint i = 0; i < campaignList.length; i++) {
    //         if(campaignList[i].categoryId == _categoryId) {
    //             _campaignList.push(campaignList[i]);
    //         }
    //     }
    //     return _campaignList;
    // }
    
}

contract Campaign {
    
    struct Request { 
        string description;   
        uint value;
        address reciptent;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
        
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;
    uint public categoryId;
    string imageUrl;
    string description;
    string name;
    
   
    modifier restricted(){
        require (msg.sender == manager);
        _;
    }
   
    function Campaign(uint minimum, address creator, uint _categoryId, string _description, string _name, string _imageUrl) public{
        manager = creator;
        minimumContribution = minimum;
        categoryId = _categoryId;
        description = _description;
        name = _name;
        imageUrl = _imageUrl;
    }
    
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address reciptent) public restricted { 
        Request memory newRequest = Request({
            description : description,
            value : value,
            reciptent : reciptent,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount >= (approversCount / 2));
        require(!request.complete);

        request.reciptent.transfer(request.value);
        request.complete = true;
        
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address, uint, string, string, string
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager,
          categoryId,
          imageUrl,
          description,
          name
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
  
    
}