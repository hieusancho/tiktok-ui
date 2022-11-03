import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

import {Wrapper as PopperWrapper} from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';

const cx=classNames.bind(styles)
const defaulFn=()=>{}

function Menu({children,items=[],hideOnClick=false, onChange = defaulFn}) {

    const [history,setHistory]=useState([{data: items}]);
    const current=history[history.length - 1];

    const renderItems=() =>{
        return current.data.map((item,index) =>{
            const isParent = !!item.children
            return <MenuItem key={index} data={item} onClick={()=>{
                if(isParent){
                    //next page
                    setHistory(prev => [...prev, item.children]);
                }else{
                    onChange(item);
                }
            }}/>
        })
    }

    return (
       
    <Tippy 
        interactive
        delay={[0,700]}
        offset={[14,8]}// width,height
        placement='bottom-end'
        hideOnClick={hideOnClick}
        render = {(attrs) =>(
            
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <PopperWrapper className={cx('menu-popper')}>
                     {history.length > 1 && (
                        <Header 
                            title={current.title}
                            onBack={() =>{
                                //Khi back lay tu ptu 0 den ptu cuoi -1
                                setHistory((prev) => prev.slice(0, prev.length - 1));
                            }}
                        />
                     )}
                    <div className={cx('menu-body')}>
                        {renderItems()}
                    </div>
                   
                </PopperWrapper>
                </div>
        )}
        //Khi ẩn Menu lấy trang đầu 
        onHide={() => setHistory(prev =>prev.slice(0,1))}
    >                
       {children}
    </Tippy>

    );
}

Menu.propTypes={
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
}
export default Menu;