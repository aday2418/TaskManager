import { type RouteConfig, index, route } from "@react-router/dev/routes";
import dashboard from "./routes/dashboard";

export default [
    index("routes/home.tsx"),
    route("dashboard", "routes/dashboard.tsx")
] satisfies RouteConfig;
