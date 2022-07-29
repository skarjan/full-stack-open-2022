const Person = ({ person, clickHandler }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={clickHandler}>Delete</button>
    </div>
  );
};

const Persons = ({ persons, clickHandler }) => {
  return (
    <>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          clickHandler={() => clickHandler(person)}
        />
      ))}
    </>
  );
};

export default Persons