import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <div className={styles.menuContainer}>
                <ul className={styles.menu}>
                    <li className="menu-item">
                        <div
                            className="menu-title"
                            onClick={() => {
                                navigate('/user');
                            }}
                        >
                            <span>Users</span>
                        </div>
                    </li>
                    {/* 추가적인 탭 필요 시 추가 */}
                    {/* <li>
          <div className="menu-item">
            <div className="menu-title">
              <AiOutlineDesktop />
              <span>UI Element</span>
            </div>
          </div>
          <ul className="submenu">
            <li className="submenu-item">
              <AiOutlineFileAdd />
              <span>Editor</span>
            </li>
            <li className="submenu-item">
              <AiOutlineFileAdd />
              <span>Editor 1</span>
            </li>
            <li className="submenu-item">
              <AiOutlineFileAdd />
              <span>Editor 2</span>
            </li>
          </ul>
        </li> */}
                </ul>
            </div>
        </div>
    );
}
