import "./App.css";
import { FetchApiProvider } from "./Providers/FetchApiProvider";
import { DashboardStateProvider } from "./Providers/DashboardStateProvider";
import { ApartmentFilterProvider } from "./Providers/ApartmentFilterProvider";
import { AppRoutes } from "./Router/AppRoutes";
import { AuthPovider } from "./Providers/AuthProvider";

function App() {
  return (
    <AuthPovider>
      <FetchApiProvider>
        <DashboardStateProvider>
          <ApartmentFilterProvider>
            <AppRoutes />
          </ApartmentFilterProvider>
        </DashboardStateProvider>
      </FetchApiProvider>
    </AuthPovider>
  );
}

export default App;
