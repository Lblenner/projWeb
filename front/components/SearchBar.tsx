import React from 'react'
import Paper from '@material-ui/core/Paper';
import { Button, TextField, InputAdornment, Select, FormControl, InputLabel } from '@material-ui/core';
import { MdSearch } from 'react-icons/md'

type MyProps = { search };
type MyState = { valueCat, valueTri };

export default class SearchBar extends React.Component<MyProps, MyState> {

    label
    labelCat
    texte

    constructor(props) {
        super(props);
        this.state = {
            valueCat: "tous",
            valueTri: ""
        };
        this.label = "Triée par"
        this.labelCat = "Catégorie"
    }

    render() {
        return (
            <div id="main_containers">
                <Paper style={{ display: 'flex', flex: 1, height: 100, position: 'relative' }} elevation={3}>
                    <TextField
                        onChange={(e) => {this.texte = e.target.value}}
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
                        <InputLabel htmlFor="selectCat" variant="outlined">
                            {this.labelCat}
                        </InputLabel>
                        <Select
                            id="selectCat"
                            native
                            label={this.labelCat}
                            defaultValue="tous"
                        >
                            <option value="tous">Toutes</option>
                            <option value="plat">Plat</option>
                            <option value="entree">Entrée</option>
                            <option value="dessert">Dessert</option>
                            <option value="apero">Apéritif</option>
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
                            label={this.label}
                            defaultValue="date"
                        >
                            <option value="date">Les plus récentes</option>
                            <option value="note">Les mieux notées</option>
                            <option value="vue">Les plus vues</option>
                            <option value="diff">Difficulté</option>
                        </Select>
                    </FormControl>
                    <Button style={{
                        position: 'absolute',
                        left: "50%", right: "50%",
                        marginLeft: "auto", marginRight: "auto",
                        bottom: -20,
                        transform: "translate(-50%, 0)"
                    }} variant="contained"
                        onClick={() => this.props.search(this.texte)}>
                        Rechercher
                </Button>
                </Paper>

                <style jsx>{`
                    #main_containers {
                        display: flex;
                        flex: 1;
                        justify-content: center;
                        margin-bottom: 30px;
                    }
                    #id {
                        width: 100px;
                    }
          `}</style>
            </div >
        )
    }
}