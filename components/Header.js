import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <Menu style={{ border: 0 }} borderless={true}>
            <Link route="/">
                <a className="item">
                    <img src="https://i.imgur.com/sB5lIsz.png" style={{height: '36px', width: '140px' , margin: '10px 0 10px 16px'}}/>
                </a>
            </Link>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Link route="/projects/new">
                        <a>
                            <Button
                                floated="right"
                                content="Start a Project"
                                icon="rocket"
                                color='teal' 
                            />
                        </a>
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}