import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import {Wrapper as PopperWrapper} from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as searchServices from '~/services/searchService'
import { useEffect, useState ,useRef} from 'react';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss'
import classNames from 'classnames/bind';
import { SearchIcon } from '~/components/Icons';
const cx=classNames.bind(styles)

function Search() {
    const [searchValue,setSearchValue]=useState('');
    const [searchResult,setSearchResult]=useState([]);
    const [showResult,setShowResult]=useState(true);
    const [loading,setLoading]=useState(false);

    const debouncedValue=useDebounce(searchValue, 500);

    const inputRef=useRef()

    useEffect(()=>{
        //do bdau searchValue la 1 chuoi rỗng 
        if(!debouncedValue.trim()){
            setSearchResult([]);
            return;
        }

         const fetchApi=async()=>{
            setLoading(true);
            const result=await searchServices.search(debouncedValue);
            setSearchResult(result);
            setLoading(false);//goi xong Api thì loading false
         } 
         
         fetchApi();
        
    }, [debouncedValue]);

    const handleClear=()=>{
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    }
    const handleHideResult=()=>{
        setShowResult(false);
    }
    const handleChange =(e)=>{
         setSearchValue(e.target.value)
    }

    return ( 
        <HeadlessTippy 
                            interactive
                            visible={showResult && searchResult.length > 0}
                            //kqua tim kiem
                            render = {(attrs) =>(
                                
                                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                            <h4 className={cx('search-title')}>
                                                Accounts
                                            </h4>

                                            {searchResult.map((result)=>(
                                                <AccountItem key={result.id} data={result}/>
                                            ))}
                                            
                                    </PopperWrapper>
                                    </div>
                            )}
                            //Click ben ngoai tippy se ẩn kqua
                            onClickOutside={handleHideResult}
                    >    
                        <div className={cx('search')}>
                            <input 
                                   ref={inputRef}
                                   value={searchValue} 
                                   placeholder='Search account and video' 
                                   spellCheck={false} 
                                   onChange={handleChange}
                                   onFocus={()=> setShowResult(true)}
                            />

                            {/* có value và k có loading thì hthi icon xóa */}

                            {!!searchValue && !loading && (
                                //button clear
                                <button className={cx('clear')} onClick={handleClear}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            )}

                                {/* Icon Loading */}
                                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                        
                                <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                                   <SearchIcon />
                                </button>   

                            
                        </div>
        </HeadlessTippy > 
    );
}

export default Search;