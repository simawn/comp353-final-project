import React, { Component } from 'react'
import axios from 'axios'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Book extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: null,
        }
    }

    async componentDidMount() {
        const result = (await axios.get("/book")).data;
        this.setState({
            books: result
        })
    }

    render() {
        return (
            <div>
                <List>
                    {this.state.books && this.state.books.map((book, index) => (
                        <ListItem divider key={index}>
                            <ListItemText primary={book.title} secondary={book.ISBN}/>
                        </ListItem>
                        ))
                    }
                </List>
            </div>
        )
    }
}
