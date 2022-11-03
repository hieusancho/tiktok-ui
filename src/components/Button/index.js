import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from './Button.module.scss';
import {Link} from 'react-router-dom';

const cx=classNames.bind(styles);

function Button({to,href, children ,primary=false, outline=false,text=false,disabled=false,rounded=false,small=false,large=false,className,leftIcon,rightIcon,onClick, ...passProps}) {
    let Comp='button';
    const props={
        onClick,
        ...passProps,//prop ko bt trc dc
    }
    if(disabled){
        delete props.onClick;
    }

    if(to){
        props.to=to
        Comp=Link
    }else if(href){
        props.href=href
        Comp='a'
    }

    const classes=cx('wrapper',{
        [className]: className,
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
    });
    return (  
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes={
    to:PropTypes.string,
    href: PropTypes.string,
    children :PropTypes.node.isRequired,
    primary:PropTypes.bool,
    outline:PropTypes.bool,
    text:PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    className:PropTypes.string,
    leftIcon:PropTypes.node,
    rightIcon:PropTypes.node,
    onClick:PropTypes.func,
}
export default Button;