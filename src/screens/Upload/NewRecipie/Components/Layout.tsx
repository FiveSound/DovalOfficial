import { ReactNode, memo } from "react";
import Header from "./Header";
import { Container } from "@/src/components/custom";
import i18next from "../../../../Translate";

type Props = {
  children: ReactNode;
  title: string;
  href: string;
  disabled?: boolean;
  onSubmit?: () => Promise<void>;
  submit?: boolean;
};

const Layout = memo((props: Props) => {
  return (
    <Container showBack={true} showHeader={true} label={i18next.t("")} style={{ flex: 1 }}>
      <Header {...props} onSubmit={props.onSubmit} submit={props.submit} disabled={props.disabled} />
      {props.children}
    </Container>
  );
});

export default Layout;
