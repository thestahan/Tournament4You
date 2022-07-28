import styled from "@emotion/styled";
import { images } from "common";
import { PageHeader } from "common/page-container";

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const ContactStatement = styled.div`
  width: 100%;
`;

const Text = styled.p`
  text-align: center;
  font-size: x-large;
  margin-top: 50px;
`;

const Image = styled.div`
  text-align: center;
`;

const ContactRoute = () => {
  return (
    <>
      <PageHeader>Contact</PageHeader>
      <Container>
        <ContactStatement>
          <Text>
            Do you want to contact with us?
            <br></br>
            <br></br>
            <Image>
              <img src={images.ContactLogo} alt="logo" />
            </Image>
          </Text>

          <Text>
            <br></br>
            Write us a message to the e-mail address{" "}
            <b>tournament4you@gmail.com</b> and we will answer you!
          </Text>
        </ContactStatement>
      </Container>
    </>
  );
};

export default ContactRoute;
