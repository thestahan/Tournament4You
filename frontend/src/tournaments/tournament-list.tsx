import styled from "@emotion/styled";
import { colors } from "common/colors";
import { NavLink } from "react-router-dom";
import { Tournament } from "./tournaments";

const Container = styled.div`
  margin-top: 40px;
`;

const TournamentItemLink = styled(NavLink)`
  text-decoration: none;
  color: ${colors.darkMaroon};
  position: relative;
  border-radius: 5px;
  &:nth-of-type(even) {
    background-color: ${colors.beige};
  }
`;

const TournamentItemContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 2px;
  opacity: 0.8;
  transition: 0.2s all ease-in-out;
  border-bottom: 2px solid transparent;
  &:hover {
    opacity: 1;
    border-bottom: 2px solid ${colors.darkMaroon};
  }
`;

const TournamentDetails = styled.div`
  flex-basis: 150px;

  &:first-of-type {
    flex-basis: 400px;
  }
`;

type Props = {
  tournaments: Tournament[];
};

const TournamentList = ({ tournaments }: Props) => {
  return (
    <Container>
      {tournaments.map((tournament) => {
        return (
          <div key={tournament.id}>
            {/* <TournamentItemLink to={`/Tournaments/${tournament.id}`}> */}
            <TournamentItemContainer>
              <TournamentDetails>{tournament.name}</TournamentDetails>
            </TournamentItemContainer>
            {/* </TournamentItemLink> */}
          </div>
        );
      })}
    </Container>
  );
};

export default TournamentList;
