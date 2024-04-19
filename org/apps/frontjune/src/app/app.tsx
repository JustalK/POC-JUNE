import { useState } from 'react';
import styles from './app.module.scss';
import { useJune } from '../hooks/useJune';

export function App() {
  const [user, setUser] = useState({
    id: 'sd56sd4f6s4df6sdfsd4f645',
    name: 'Kevin',
    email: 'jk@gmail.com',
    hobby: 'Velo',
  });
  const [compagny, setCompagny] = useState({
    id: 'ujn4g84n6cf4f4b16fg',
    name: 'Justalk',
  });
  const analytics = useJune();

  const handleClick1 = () => {
    if (analytics) analytics.track('HandleClick1');
  };
  const handleClick2 = () => {
    if (analytics) {
      if (compagny) {
        analytics.track(
          'HandleClick2',
          {
            param: 'whatever',
          },
          {
            context: { groupId: compagny.id },
          }
        );
      } else {
        analytics.track('HandleClick2', {
          param: 'whatever',
        });
      }
    }
  };

  const handleUser = () => {
    if (analytics) {
      const { id, email, name, hobby } = user;
      analytics.identify(id, {
        email,
        name,
        hobby,
      });
    }
  };

  const handleCompagny = () => {
    if (analytics) {
      const { id, name } = compagny;
      analytics.group(id, {
        group_type: 'company',
        name,
      });
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.app__card}>
        <div className={styles.app__card__title}>TEST EVENT</div>
        <button onClick={handleClick1}>HANDLE CLICK 1</button>
        <button onClick={handleClick2}>HANDLE CLICK 2</button>
      </div>
      <div className={styles.app__cardrow}>
        <div className={styles.app__card__title}>TEST USER</div>
        <label>
          ID:
          <input
            onChange={(e) => setUser({ ...user, id: e.target.value })}
            value={user.id}
          />
        </label>
        <label>
          Name:
          <input
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
          />
        </label>
        <label>
          Email:
          <input
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
        </label>
        <label>
          Hobby:
          <input
            onChange={(e) => setUser({ ...user, hobby: e.target.value })}
            value={user.hobby}
          />
        </label>
        <button onClick={handleUser}>HANDLE User</button>
      </div>
      <div className={styles.app__cardrow}>
        <div className={styles.app__card__title}>TEST GROUP - COMPAGNY</div>
        <label>
          ID:
          <input
            onChange={(e) => setCompagny({ ...compagny, id: e.target.value })}
            value={compagny.id}
          />
        </label>
        <label>
          Name:
          <input
            onChange={(e) => setCompagny({ ...compagny, name: e.target.value })}
            value={compagny.name}
          />
        </label>
        <button onClick={handleCompagny}>HANDLE Compagny</button>
      </div>
    </div>
  );
}

export default App;
