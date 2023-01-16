import styles from './Header.module.css';
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';


const Header = (props)=>{
    return (<>
<header className={styles.header}>  
<h1>ReactMeals</h1>
<HeaderCartButton onClickCartButton={props.onShowCart}/>
</header>
    <div className={styles['main-image']}>
        <img src={ mealsImage }  alt='All delicious meals at one table!' />
    </div>
    
    </>)
}

export default Header