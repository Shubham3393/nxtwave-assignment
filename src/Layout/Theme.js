import classes from './Theme.module.scss';

const Theme = (props) => {
    return (
        <div className={`${classes.theme} ${props.className}`}>{props.children}</div>
    )
}
export default Theme;