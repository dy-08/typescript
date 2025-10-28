import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
    let menus = [
        {
            name: '홈',
            path: '/',
        },
        {
            name: '날씨',
            path: '/weather',
        },
        {
            name: '상품소개',
            path: '/products',
        },
        {
            name: '장바구니',
            path: '/cart',
        },
        {
            name: '문의',
            path: '/contact',
        },
    ];
    return (
        <header className={styles.navbar}>
            <div className={styles.logo}>typeScript</div>
            <nav>
                <ul className={styles.menuList}>
                    {menus.map((item) => (
                        <li key={item.path}>
                            {/* NavLink => isActive: 클릭 시 true, false를 반환 */}
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => (isActive ? styles.active : undefined)}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
