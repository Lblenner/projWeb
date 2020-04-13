import React from 'react'
import Paper from '@material-ui/core/Paper';
import { Fab, Card, CardContent, Typography, CardActions, Button, TextField, InputAdornment, Select } from '@material-ui/core';
import { MdAdd, MdSearch } from 'react-icons/md'

type MyProps = {};
type MyState = {};

export default class SearchBar extends React.Component<MyProps, MyState> {

    constructor(props) {
        super(props);
        this.state = {
            liste: []
        };
    }



    render() {
        return (
            <div id="main_container">
                <Paper style={{ width: "60%", height: 100, position: 'relative' }} elevation={3}>
                    <TextField
                        variant="outlined"
                        style={{
                            position: 'absolute',
                            left: "30%", right: "30%",
                            marginTop: 15
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MdSearch size={30} />
                                </InputAdornment>
                            ),
                        }} />
                    <Select
                        variant="outlined"
                        style={{
                            position: 'absolute',
                            right: "70%",
                            left: "1%",
                            marginTop: 15
                        }}
                        native
                        value={10}
                    >
                        <option value="tous">Tous</option>
                        <option value="dessert">Dessert</option>
                        <option value="entree">Entrée</option>
                        <option value="plat">Plat</option>
                    </Select>
                    <Button style={{
                        position: 'absolute',
                        left: 0, right: 0,
                        marginLeft: "auto", marginRight: "auto",
                        bottom: -20
                    }} variant="contained">
                        Rechercher
                    </Button>
                </Paper>

                <style jsx>{`
                    #main_container {
                        display: flex;
                        justify-content: center;
                        flex-grow: 1;
                        margin-top: 20px;
                    }
                    #id {
                        width: 100px;
                    }
          `}</style>
            </div >
        )
    }
}