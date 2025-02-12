import { useRouteMatch, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useFetch } from '../../../typescript/getData';
import { Starships as images } from '../../../assets/images/starships/starships';
import rebels from '../../../assets/images/blazon/rebels.jpg';
import empire from '../../../assets/images/blazon/empire.jpg';
import { Color } from '../index';
import { Responce } from '../../../typescript/types';

interface StarshipProps {
  imageUrl?: any
};

interface LabelProps {
  name?: string
};

interface BlazonProps {
  blazonColor?: string
};

const HoverTabs = () => {

  const { url } = useRouteMatch();
  const history = useHistory();
  const responce = useFetch(2);

  const handleClick = (item: Responce) => {
    const name = item.name?.toLocaleLowerCase().replace(/\s/g, '');
    history.push(`${url}/${name}`);
  };

  return (
    <Container>
      {responce && responce.map((item: Responce, key: number) => {

        let url: any, fraction: any;

        images.map((i) => {
          const name = item.name?.toLocaleLowerCase().replace(/\s/g, '');
          if (i.name === name) {
            url = i.url;
            fraction = i.fraction;
          };
        });

        return (
          <Starship
            key={key}
            imageUrl={url}
            onClick={() => handleClick(item)}>
            <Label name={item.name}/>
            <Blazon 
              src={ fraction === 'rebels' ? rebels : empire}
              blazonColor={ fraction === 'rebels' ? Color.filterRebels : Color.filterEmpire}/>
          </Starship>
          )
        })}
    </Container>
  );
};

export default HoverTabs;

const Animation = keyframes`
  from {
    height: 100%;
    width: 100%;
    opacity: 0;
  }
  to {
    height: 50em;
    width: 90%;
    opacity: 1;
  }
 `;

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50em;
  width: 90%;
  animation: ${Animation} 700ms;
`;

const Label = styled.div<LabelProps>`
  position: absolute;
  height: 5em;
  width: 5em;
  bottom: 2em;
  left: 50%;
  transform: translate(-50%, 0);
  transition: all 500ms;

  &:before {
    content: '${(props => props.name)}';
    position: relative;
    display: flex;
    width: 20em;
    bottom: 2em;
    left: 50%;
    color: #d8d8d8;
    font-size: 2em;
    font-weight: 600;
    font-family: 'Invisible', sans-serif;
    transform-origin: 0 50%;
    transform: rotate(-90deg);
  }
 `;

const Blazon = styled.img<BlazonProps>`
  position: absolute;
  height: 5em;
  width: 5em;
  bottom: 2em;
  left: 50%;
  filter: ${(props => props.blazonColor)};
  transform: translate(-50%, 0);
  transition: all 500ms;
 `;

 const Starship = styled.div<StarshipProps>`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0.5em;
  height: 100%;
  flex: 0.5;
  border-radius: 3em;
  transition: all 500ms;
  background-image: url(${(props => props.imageUrl)});
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;

  &:hover {
    flex: 7;
    transition: all 500ms;

    ${Label} {
      left: 2em;
      transform-origin: center;
      transform: rotate(90deg);
    }

    ${Blazon} {
      left: 2em;
      transform-origin: center;
      transform: rotate(0deg);
    }
  }
`;