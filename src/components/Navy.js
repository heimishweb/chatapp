import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'


function Navy(props) {
    const [queryValue, setValue] = useState('')

    let styles = {

        fontFamily: 'Titan One',

    };
    if (queryValue) {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/" style={styles}>shopchat</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/userlogin">Login</Nav.Link>
                        <Nav.Link href="/userregister">Register</Nav.Link>
                        <Nav.Link href="/vendor">For Vendors</Nav.Link>
                        <Nav.Link href="#">Contact</Nav.Link>

                    </Nav>
                    <Form inline>
                        <input onChange={event => setValue(event.target.value)} class="form-control" type="text" placeholder="Search" aria-label="Search"></input>
                        {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>

                {props.employees.filter(name => name.name.toLowerCase().includes(queryValue)).map(filteredName => (


                    <tr>
                        <th scope="row"></th>
                        <td><img src={filteredName.image} alt="profilepic"></img></td>
                        <td>{filteredName.name},</td>
                        {/* <td>{filteredName.phone},</td> */}
                        <a href={filteredName.shopchatlink}><td>shopchat room</td></a>
                       
                    </tr>



                ))}

            </div>
        )
    }
return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/" style={styles}>shopchat</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/userlogin">Login</Nav.Link>
                <Nav.Link href="/userregister">Register</Nav.Link>
                <Nav.Link href="/vendor">For Vendors</Nav.Link>
                <Nav.Link href="#">Contact</Nav.Link>

            </Nav>
            <Form inline>
                <input onChange={event => setValue(event.target.value)} class="form-control" type="text" placeholder="Search" aria-label="Search"></input>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
    </div>
)

}

export default Navy;