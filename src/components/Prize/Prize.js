import React from 'react';
import classes from './Prize.module.css'; 
import Modal from '../../shared/UI/Modal/Modal'; 
import { rarityInfo } from '../../shared/utility'; 
import Item from '../Item/Item'; 

const prize = (props) => {
    const prizeClasses = []; 
    if (props.item.rarity === '???') {
        prizeClasses.push(classes.Rainbow); 
    } 

    return (
        <Modal show clicked={props.clicked} animation="openPrize">
            <div className={classes.Prize}>
                <div className={classes.Info}>
                    You unboxed {rarityInfo[props.item.rarity][2]} <strong style={{color: rarityInfo[props.item.rarity][0]}} className={prizeClasses.join(' ')}>{props.item.rarity.toLowerCase()}</strong> item! 
                    <hr/>
                    <div className={classes.Description}>{props.item.description}</div>
                    <div className={classes.Stats}>
                        <div className={classes.Stat}>Owned: {props.item.quantity}</div>
                        <div className={classes.Stat}>In circulation: {props.item.circulationNum}</div>
                    </div>
                </div>
                <div>
                    <Item 
                        name={props.item.name} 
                        quantity={1} 
                        rarity={props.item.rarity} 
                        disableHover
                        disableSpin
                    />
                </div>
            </div>
        </Modal>  
    );
};

export default prize; 
