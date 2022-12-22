import classes from './Card.module.scss';


const Card = (props) => {
    return (
        <div className={classes.card}>
            <div className={classes.icon_tit_cat}>
                <img src={props.icon_url}  alt={props.title} className={classes.icon}/>
                <div className={classes.tit_cat}>
                    <div className={classes.title}>{props.title}</div>
                    <div className={classes.category}>{props.category}</div>
                </div>
            </div>
            <div className={classes.link}>{props.link}</div>
            <div className={classes.description}>{props.description}</div>
        </div>
    )
}

export default Card;