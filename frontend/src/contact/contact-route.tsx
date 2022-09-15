import styled from "@emotion/styled";
import { PageHeader } from "common/page-container";

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const ContactStatement = styled.div`
  width: 100%;
`;

const ContactRoute = () => {
  return (
    <>
      <PageHeader>Contact</PageHeader>
      <Container>
        <ContactStatement></ContactStatement>
      </Container>
    </>
  );
};

export default ContactRoute;
