import styled from "@emotion/styled";
import { isAuthenticated } from "common/api/utils/local-storage";
import { colors } from "common/colors";
import { images } from "common";

const Container = styled.div`
  height: 100%;
`;

const TextContent = styled.div`

`;

const TextTopic = styled.h1`
  background-color: ${colors.moderatePink};
  text-align: center;
  border-radius: 18px;
`;

const Text = styled.p`
  background-color: ${colors.darkGray};
  text-align: center;
  font-size: x-large;
  border-radius: 18px;
  
`;

const Image = styled.div`
  background-color: ${colors.darkGray};
  text-align: center;
  border-radius: 18px;
`;

const DashboardRoute = () => {
  const authenticated = isAuthenticated();

  return (
    <Container>
      {authenticated ? (
        <TextContent>
          <TextTopic>THE TOURNAMENT4YOU APPLICATION</TextTopic>
          <br></br>
          <Text>
          <br></br>
          Hello, you have successfully logged into your account.
            <br></br><br></br>
          </Text>
          <Image>
            <img src={images.VoleyballPlayerLeft} alt="logo" />
            <img src={images.VoleyballPlayerRight} alt="logo" />
            </Image>
          <Text>
            This web application allows you to:
            <br></br><br></br>
            <b>Create a volleyball tournament.</b>
            <br></br>
            <b>Add the new teams to the tournament.</b>
            <br></br>
            <b>Add the players to the team.</b>
            <br></br>
            <b>Follow the tournament.</b>
            <br></br><br></br>
            </Text>
        </TextContent>
        
        
      ) : (
        <TextContent>
          <TextTopic>WELCOME TO TOURNAMENT4YOU</TextTopic>
          <br></br>
          <Text>
            <br></br>
            Do you have a problem with managing volleyball tournaments? The <b>TOURNAMENT4YOU</b> application will surely solve it.
            <br></br><br></br>
            This web application is designed for people who want to set <b>voleyball tournaments</b>!
            </Text>
            <Image>
              <img src={images.VoleyballTournamentLogo} alt="logo" />
            </Image>
            <Text>
            Create a volleyball <b>event</b>, add <b>teams</b> to it, enter <b>players</b> and transparently follow the tournament, completing the results on a regular basis.
            <br></br><br></br>
            Thanks to the gameplay tree, following the tournament will become much simpler and more transparent.
            <br></br><br></br>
            Don't wait any longer! Create <b>an account</b> to be able to use the functionality of the application!
            <br></br><br></br>
          </Text>
        </TextContent>
      )}
    </Container>
  );
};

export default DashboardRoute;
