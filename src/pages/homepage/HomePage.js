import React, { useState, useEffect } from "react";
import "../../assets/style/App.css";
import Table from "react-bootstrap/Table";
import { observer } from "mobx-react";
import axios from 'axios';
import { getPhotos, deletePhoto, APIURL, getVotes } from "../../utils/requests";
import $ from "jquery";
import history from '../../utils/history'
class HomePage extends React.Component {

    constructor() {
        super()
        this.state = {
            photos: [],
            id: '',
            sub_id: '',
            votes: '',
            vote_up: '',
            vote_down: '',
            vote_state: null,
            vote: '',
            visible: false,
            push: null
        }
    }

    componentDidMount() {
        this.setState({
            push: 1
        })

        console.log('pus push')
        const getAllPhotos = async () => {
            const response = await getPhotos();
            this.setState({
                photos: response.data
            })
        };
        console.log('rotue', this.props)
        const getAllVotes = async () => {
            const votes = await getVotes()

            const positive = votes.data.filter((vote) => {
                return vote.value == 1
            })

            const negative = votes.data.filter((vote) => {
                return vote.value == 0
            })

            this.setState({
                vote_up: positive.length,
                vote_down: negative.length
            })

            this.setState({
                votes: votes.data
            })
        };
        getAllPhotos()
        getAllVotes()
    };


    handleFavSubmit = async (event, fav) => {
        event.preventDefault();

        await axios.post(`https://api.thecatapi.com/v1/favourites`, fav, { headers: { "Content-Type": "application/json", "x-api-key": "52bd8cc7-7b96-4219-8015-d7c56f3eaa9f" } }
        )
            .then(res => {
                localStorage.setItem('favId', res.data.id)
                this.setState({
                    vote_state: 1,
                    vote: this.state.vote
                })
            })
    }

    handleUnFavSubmit = (event) => {
        event.preventDefault();
        const favourite_id = localStorage.getItem('favId')
        axios.delete(`https://api.thecatapi.com/v1/favourites/${favourite_id}`, { headers: { "Content-Type": "application/json", "x-api-key": "52bd8cc7-7b96-4219-8015-d7c56f3eaa9f" } }
        )
            .then(res => {
                localStorage.removeItem('favId')
                this.setState({
                    vote_state: null
                })
            })
    }

    handleVoteSubmit = (event, voteUp) => {
        event.preventDefault();

        axios.post(`https://api.thecatapi.com/v1/votes`, voteUp, { headers: { "Content-Type": "application/json", "x-api-key": "52bd8cc7-7b96-4219-8015-d7c56f3eaa9f" } }
        )
            .then(res => {
                console.log(res.data);
                this.setState({
                    push: 1
                })
            })
    }

    render() {

        const photoList = this.state.photos.map(p => {
            const fav = {
                image_id: p.id,
                sub_id: p.sub_id
            }

            const voteUp = {
                image_id: p.id,
                sub_id: p.sub_id,
                value: true
            }

            const voteDown = {
                image_id: p.id,
                sub_id: p.sub_id,
                value: false
            }

            const fadeIn = () => {
                let el = document.querySelector('.centered');

                if (!this.state.visible) {
                    return el.classList.add('fadeIn'), el.classList.remove('fadeOut');
                } else {
                    return el.classList.add('fadeOut'), el.classList.remove('fadeIn'), el.classList.remove('fadeIn'), el.classList.remove('fadeIn');

                }
            }

            const fadeOut = () => {
                let el = document.querySelector('.centered');
                this.setState({
                    visible: false
                })
                if (!this.state.visible) {
                    return el.classList.add('fadeOut'), el.classList.remove('fadeIn')
                } else {
                    return el.classList.add('fadeIn'), el.classList.remove('fadeOut')

                }
            }

            return (
                <div className="container" style={{ textAlign: 'center', marginTop: '20px' }} key={p.id}>
                    <img key={p.id} src={p.url} className="img-fluid" id="img_wrap" onMouseEnter={() => fadeIn()} onMouseLeave={() => fadeOut()} style={{ width: '430px' }} />
                    <p style={{ width: '100%' }}>{this.state.vote_up - this.state.vote_down} </p>
                    <div className="vote-select">
                        <button type="button" className="btn btn-success btn-lg" style={{ position: 'relative', marginRight: '15px', width: '130px' }} onClick={(e) => this.handleVoteSubmit(e, voteUp)}>Vote Up</button>
                        <button type="button" className="btn btn-danger btn-lg" style={{ position: 'relative', marginLeft: '15px', width: '130px' }} onClick={(e) => this.handleVoteSubmit(e, voteDown)}>Vote Down </button>
                    </div>
                    <div className="centered fadeOut" id="favourite_wrap" style={{ position: 'relative', bottom: '150px' }}>

                        <div className="fave-select" onMouseEnter={() => fadeIn()} onMouseLeave={() => fadeOut()}>
                            {!localStorage.getItem("favId") ? <button type="button" className="btn btn-primary btn-lg btn-block" style={{ position: 'relative' }} onClick={(e) => this.handleFavSubmit(e, fav)}> <i className='fa fa-heart' style={{ fontSize: '20px', color: 'red' }}></i> Favourite </button> : <button type="button" className="btn btn-secondary btn-lg btn-block" style={{ position: 'relative' }} onClick={(e) => this.handleUnFavSubmit(e)}>  <i className='fa fa-heart' style={{ fontSize: '20px' }}></i> Unfavourite</button>}
                        </div>
                    </div>

                </div>
            )
        })

        return (
            <div className="container">
                {photoList}
            </div>
        );

    }

}
export default observer(HomePage);