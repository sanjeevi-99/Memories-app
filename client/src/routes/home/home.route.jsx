import React, { useState } from "react";
import { Grow, Grid, Container, Paper, AppBar, TextField, Button} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

import Paginate from "../../components/pagination/pagination.component";
import Posts from "../../components/posts/posts.component";
import CreatePost from "../../components/create-post/create-post.component";
import { getPostsBySearch } from '../../store/post/post.action';

import useStyles from './home.styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();

    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
        } else {
        history.push('/');
        }
    };

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            searchPost();
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return (<Grow in>
                <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(event) => setSearch(event.target.value)} />
                                <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleAddChip} onDelete={handleDeleteChip} label="Search Tags" variant="outlined" />
                                <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">Search</Button>
                            </AppBar>
                            <CreatePost currentId={currentId} setCurrentId={setCurrentId}/>
                            {(!searchQuery && !tags.length) &&(
                                <Paper elevation={6} className={classes.pagination}>
                                    <Paginate page={page} />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>)
};

export default Home;