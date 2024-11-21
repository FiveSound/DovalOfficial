import { TabFollowers, TabFollowing, Tabs } from './Components';
import { Container } from '@/src/components/custom';

type Props = {
  route: {
    params: {
      initialIndex: number;
      username: string;
    };
  };
};

const Followers = (props: Props) => {
  const { initialIndex, username } = props.route.params;

  return (
    <Container 
    label={username}
    showHeader={true}>
    
      <Tabs
        username={username}
        initialIndex={initialIndex}
        Followers={<TabFollowers username={username} />}
        Following={<TabFollowing username={username} />}
      />
    </Container>
  );
};

export default Followers;
