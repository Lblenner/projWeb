import React from 'react'
import Paper from '@material-ui/core/Paper';
import { Fab, Card, CardContent, Typography, CardActions, Button, TextField, InputAdornment, Select, FormControl, InputLabel } from '@material-ui/core';
import { MdAdd, MdSearch } from 'react-icons/md'

type MyProps = {};
type MyState = {};

export default class SearchBar extends React.Component<MyProps, MyState> {

    label
    labelCat

    constructor(props) {
        super(props);
        this.state = {
            liste: []
        };
        this.label = "Triée par"
        this.labelCat = "Catégorie"
    }



    render() {
        return (
            <div id="main_container">
                <Paper style={{ width: 1000, height: 100, position: 'relative' }} elevation={3}>
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
                    <FormControl
                        style={{
                            position: 'absolute',
                            right: "70%",
                            left: "1%",
                            marginTop: 15
                        }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="selectTri" variant="outlined">
                            {this.labelCat}
                        </InputLabel>
                        <Select
                            id="selectTri"
                            native
                            value={10}
                            label={this.labelCat}
                        >
                            <option value="tous">Toutes</option>
                            <option value="dessert">Plat</option>
                            <option value="entree">Entrée</option>
                            <option value="plat">Dessert</option>
                            <option value="plat">Apéritif</option>
                        </Select>
                    </FormControl>
                    <FormControl
                        style={{
                            position: 'absolute',
                            right: "1%",
                            left: "70%",
                            marginTop: 15
                        }}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="selectTri" variant="outlined">
                            {this.label}
                        </InputLabel>
                        <Select
                            id="selectTri"
                            native
                            value={10}
                            label={this.label}
                        >
                            <option value="tous">Les plus récentes</option>
                            <option value="dessert">Les mieux notées</option>
                            <option value="entree">Les plus vues</option>
                            <option value="plat">Difficulté</option>
                        </Select>
                    </FormControl>
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