import { ReactNode, memo } from "react";
import Header from "./Header";
import { Container } from "@/src/components/custom";
import i18next from "../../../../Translate";

type Props = {
  children: ReactNode;
  title: string;
  href: string;
  disabled?: boolean;
  submit?: boolean;
};

const Layout = memo((props: Props) => {
  return (
    <Container showBack={true} showHeader={true} label={i18next.t("")} style={{ flex: 1 }}>
      <Header {...props} disabled={props.disabled} submit={props.submit} />
      {props.children}
    </Container>
  );
});

export default Layout;
