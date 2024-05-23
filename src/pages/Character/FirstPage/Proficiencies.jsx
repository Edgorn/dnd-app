import { Card, CardBody, CardHeader, List } from "reactstrap"

export default function Profiencies({ character, nombreCompetencia }) {
  return (
    <Card>
      <CardHeader>
        Otras competencias e idiomas
      </CardHeader>
      <CardBody>
        <p>Competencias:</p>
        <List>
          {
            character.proficiencies.map((language, index) => 
              <li key={index}>{nombreCompetencia(language, 'reference')}</li>
            )
          }
        </List>
        <p>Idiomas:</p>
        <List>
          {
            character.languages.map((language, index) => 
              <li key={index}>{nombreCompetencia(language, 'language')}</li>
            )
          }
        </List>
      </CardBody>
    </Card>
  )
}