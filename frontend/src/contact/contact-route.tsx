import styled from "@emotion/styled";
import { colors } from "common/colors";
import { images } from "common";

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const ContactStatement = styled.div`
  width: 100%;
  
`;


const DisplayMap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;

const TextTopic = styled.h1`
  background-color: ${colors.moderatePink};
  text-align: center;
  border-radius: 18px;
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
      <TextTopic>Contact page</TextTopic>
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

        <DisplayMap>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20236.370180616614!2d17.887534039550783!3d50.654117199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471053bb1bcdafab%3A0xf2ef41915344d5dd!2sPolitechnika%20Opolska!5e0!3m2!1spl!2spl!4v1652419418507!5m2!1spl!2spl"
            width="80%"
            height="100%"
          ></iframe>
        </DisplayMap>
      </Container>
    </>
  );
};

export default ContactRoute;
