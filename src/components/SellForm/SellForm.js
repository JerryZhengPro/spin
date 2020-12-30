import React from 'react';
import YesNoButton from '../../shared/UI/Buttons/YesNoButton/YesNoButton'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner'; 
import classes from './SellForm.module.css'; 
import Modal from '../../shared/UI/Modal/Modal'; 

const sellForm = (props) => (
    <Modal 
        style={{borderRadius: '0'}} 
        show={props.show} 
        clicked={props.clicked} 
        backdropStyle={{opacity: '0.5'}}
    >
        {!props.listItemLoading 
            ? 
                <>
                    <div className={classes.Title}>{props.currentItemName}</div>
                    {props.children}
                    <YesNoButton 
                        btnType="Yes" 
                        disabled={!props.formIsValid}
                        onClick={props.submitHandler}
                        style={{width: '100%'}}
                    >
                        {props.buttonText}
                    </YesNoButton>
                    {props.listError ? <div className={classes.Error}>{props.listError}</div> : null}
                </>
            : <LoadingSpinner/>
        }
    </Modal> 
);

export default sellForm; 
