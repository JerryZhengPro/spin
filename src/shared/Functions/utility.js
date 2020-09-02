export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid; 
    }

    if (rules.length) {
        isValid = value.length === rules.length && isValid; 
    }

    if (rules.isEmail) {
        const pattern = /\S+@\S+\.\S+/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    return isValid; 
}

export const mapRarityToColor = (rarity) => {
    if (rarity === 'Common') {
        return 'brown';
    }
    if (rarity === 'Uncommon') {
        return 'cyan';
    }
    if (rarity === 'Rare') {
        return 'red';
    }
    if (rarity === 'Epic') {
        return 'purple';
    }
    if (rarity === 'Holy') {
        return 'orange';
    }
    if (rarity === 'Godly') {
        return 'yellow';
    }
    if (rarity === '???') {
        return 'rainbow';
    }
}
