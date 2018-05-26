import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <Menu style={{ marginTop: '5px' }}>
            <Link route="/">
                <a className="item">
                    Crowd Funding
                </a>
            </Link>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Link route="/projects/new">
                        <a>
                            <Button
                                floated="right"
                                content="Start a Project"
                                icon="add circle"
                                color='teal' 
                            />
                        </a>
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}