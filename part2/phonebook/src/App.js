import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Heading from "./components/Heading";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    personService.getAll().then((initialPhonebook) => {
      setPersons(initialPhonebook);
    });
  }, []);

  const peopleToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const handleFilterChange = (event) => {
    event.target.value === "" ? setShowAll(true) : setShowAll(false);
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    let duplicateCheck = persons.find((person) => person.name === newName);
    if (duplicateCheck === undefined) {
      personService.create(nameObject).then((newPhonebook) => {
        setPersons(persons.concat(newPhonebook));
        setNewName("");
        setNewNumber("");
        const newMessage = {
          message: `Added ${newName}`,
          type: "success",
        };
        setNotification(newMessage);
        setTimeout(() => {
          const newMessage = {
            message: null,
            type: null,
          };
          setNotification(newMessage);
        }, 5000);
      });
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        personService
          .changeNumber(duplicateCheck.id, nameObject)
          .then(() => {
            const newPersons = persons.map((person) => (person.id !== duplicateCheck.id ? person : nameObject));
            setPersons(
              newPersons
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            const newMessage = {
              message: `${duplicateCheck.name} has already been removed from server`,
              type: "error",
            };
            setNotification(newMessage);
            const newPersons = persons.filter((person) => person.id !== duplicateCheck.id);
            setPersons(
              newPersons
            );
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              const newMessage = {
                message: null,
                type: null,
              };
              setNotification(newMessage);
            }, 5000);
          });
      }
    }
  };

  const deletePersonClick = (person) => {
    if (window.confirm(`Do you really want to delete: ${person.name}?`)) {
      personService.deletePerson(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  return (
    <div>
      <Heading text={"Phonebook"} />
      <Notification message={notification.message} type={notification.type} />
      <Filter filterValue={filter} filterHandler={handleFilterChange} />
      <Heading text={"Add a new"} />
      <PersonForm
        submitHandler={handleSubmit}
        nameValue={newName}
        nameHandler={handleNameChange}
        numberValue={newNumber}
        numberHandler={handleNumberChange}
      />
      <Heading text={"Numbers"} />
      <Persons persons={peopleToShow} clickHandler={deletePersonClick} />
    </div>
  );
};

export default App;
