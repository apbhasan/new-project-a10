// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./components/Home/Home";
import AllProducts from "./components/AllProducts/AllProducts";
import AddArtwork from "./components/AddArtwork/AddArtwork";
import MyGallery from "./components/MyGallery/MyGallery";
import Favorites from "./components/Favorites/Favorites";
import ArtworkDetails from "./components/ArtworkDetails/ArtworkDetails";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <AllProducts /> }, // Explore Artworks
      {
        path: "add-artwork",
        element: (
          <PrivateRoute>
            <AddArtwork />
          </PrivateRoute>
        ),
      },
      {
        path: "my-gallery",
        element: (
          <PrivateRoute>
            <MyGallery />
          </PrivateRoute>
        ),
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
      {
        path: "artworks/:id",
        element: (
          <PrivateRoute>
            <ArtworkDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "explore",
        element: <AllProducts />,
       },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
