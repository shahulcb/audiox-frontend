import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MusicDetails from "./pages/MusicDetails";
import Search from "./pages/Search";
import Playlists from "./pages/Playlists";
import DetailedPlaylist from "./pages/DetailedPlaylist";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./utils/ProtectedRoute"
import NotFound from "./pages/NotFound";
import ListSongs from "./pages/ListSongs";
import EditSong from "./pages/EditSong"


function App() {
  return (
    <div>
      <Toaster position="top-center" />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="dashboard" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path=":author/:title/:songId" element={<MusicDetails />} />
          <Route path="search">
            <Route index element={<Search />} />
            <Route path=":title/:songId" element={<MusicDetails />} />
            <Route path=":userId" element={<ListSongs />} />
            <Route path=":userId/:title/:songId" element={<MusicDetails />} />
          </Route>
          <Route path="playlists">
            <Route index element={<Playlists />} />
            <Route path=":playlistId">
              <Route index element={<DetailedPlaylist />} />
              <Route path=":title/:songId" element={<MusicDetails />} />
            </Route>
          </Route >
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="my-song/:title/:songId" element={<MusicDetails />} />
            <Route path="edit-song/:songId" element={<EditSong />} />
          </Route>
          <Route path="upload" element={<Upload />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
