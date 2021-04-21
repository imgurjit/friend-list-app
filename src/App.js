import { useState, useEffect, useCallback } from "react";
import "./App.css";
import friendData from "./dummyData";
import FriendList from "./components/friend-list/friend-list";
import { v4 as uuidv4 } from "uuid";
import SortPagination from "./components/sort-pagination/sort-pagination";
import Dialog from "./components/dialog/dialog";

function App() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalNoOfRecords] = useState(4);
  const [enteredFriendName, setEnteredFriendName] = useState("");
  const [isNextPageAvailable, setIsNextPageAvailable] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [idTobeDeleted, setIdTobeDeleted] = useState(undefined);
  const [nameToBeDeleted, setNameToBeDeleted] = useState(undefined);

  const handlePrev = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };

  const nextPageAvailability = () => {
    const indexOfLastData = (pageNumber + 1) * totalNoOfRecords;
    const indexOfFirstData = indexOfLastData - totalNoOfRecords;
    let x = [...data];
    if ([...x.slice(indexOfFirstData, indexOfLastData)].length === 0) setIsNextPageAvailable(false);
    else setIsNextPageAvailable(true);
  };

  const configurePaginatedData = useCallback(() => {
    const indexOfLastData = pageNumber * totalNoOfRecords;
    const indexOfFirstData = indexOfLastData - totalNoOfRecords;
    let x = [...data];
    nextPageAvailability();
    setPaginatedData([...x.slice(indexOfFirstData, indexOfLastData)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, pageNumber]);

  useEffect(() => {
    configurePaginatedData();
  }, [configurePaginatedData]);

  useEffect(() => {
    setData(friendData);
    setOriginalData(friendData);
  }, []);

  let handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (enteredFriendName.trim() === "") return;
      else {
        let dataCopy = [...originalData];
        let filterData = dataCopy.filter((d) => d.name.toUpperCase() === event.target.value.toUpperCase());
        if (filterData.length === 0) {
          setData([{ id: uuidv4(), name: enteredFriendName, isFavourite: false }].concat(dataCopy));
          setOriginalData([{ id: uuidv4(), name: enteredFriendName, isFavourite: false }].concat(dataCopy));
        } else {
          setData(originalData);
          alert("Friend already exists");
        }
      }
      setEnteredFriendName("");
    }
  };

  let setFirstName = (event) => {
    setEnteredFriendName(event.target.value);
    var dataCopy = [...originalData];
    if (event.target.value.trim() !== "") {
      let filterData = dataCopy.filter((d) => d.name.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1);
      setData(filterData);
    } else setData(originalData);

    if (data.length < totalNoOfRecords) setPageNumber(1);
  };

  let handleDeleteFriend = (id) => {
    var dataCopy = originalData.filter((el) => el.id !== id);
    if (dataCopy.length / (pageNumber - 1) === totalNoOfRecords) setPageNumber(pageNumber - 1);
    setData(dataCopy);
    setOriginalData(dataCopy);
    setEnteredFriendName("");
    console.log("dataCopy --> ", dataCopy);
  };

  let handleToggleFavourite = (id) => {
    var dataCopy = [...data];
    var index = data.findIndex((obj) => obj.id === id);
    dataCopy[index].isFavourite = !data[index].isFavourite;
    setData(dataCopy);
    setOriginalData(dataCopy);
  };

  let sortData = () => {
    var dataCopy = [...data];
    let sortedData = [];
    if (!isSorted) sortedData = dataCopy.sort((x, y) => (x.isFavourite === y.isFavourite ? 0 : x.isFavourite ? -1 : 1));
    else sortedData = dataCopy.sort((x, y) => (y.isFavourite === x.isFavourite ? 0 : y.isFavourite ? -1 : 1));
    setIsSorted(!isSorted);
    setData(sortedData);
    setOriginalData(sortedData);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <header className="header">Friends List</header>
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Enter your friend's name to search or press enter to add"
          value={enteredFriendName}
          onChange={setFirstName}
          onKeyPress={handleKeyPress}></input>

        <FriendList
          data={paginatedData}
          deleteFriend={(id, name) => {
            setIsOpenModal(true);
            setIdTobeDeleted(id);
            setNameToBeDeleted(name);
          }}
          toggleFavourite={handleToggleFavourite}></FriendList>

        <SortPagination
          pageNumber={pageNumber}
          handlePrev={handlePrev}
          handleNext={handleNext}
          isNextPageAvailable={isNextPageAvailable}
          sortData={sortData}
          isSorted={isSorted}></SortPagination>

        <Dialog
          nameToBeDeleted={nameToBeDeleted}
          isOpenModal={isOpenModal}
          closeModal={(v) => {
            setIsOpenModal(false);
            if (v === "YES") handleDeleteFriend(idTobeDeleted);
          }}></Dialog>
      </div>
    </div>
  );
}

export default App;
