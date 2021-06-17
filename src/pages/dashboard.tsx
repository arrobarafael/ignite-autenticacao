import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Can } from '../components/Can';
import { useCan } from '../hooks/useCan';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list'],
  });

  useEffect(() => {
    api.get('/me').then((response) => console.log(response));
  }, []);

  return (
    <>
      <h1>dashboard {user?.email}</h1>
      {userCanSeeMetrics && <div>Métricas</div>}

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']}>
        <div>Exibir lista</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/me');

  return {
    props: {},
  };
});
