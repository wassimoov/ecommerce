import { useNavigate } from "react-router-dom";
import "./style.css";
import { Paper, Divider, MenuList, MenuItem, Typography } from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AspectRatioOutlinedIcon from "@mui/icons-material/AspectRatioOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <Paper className="stylepop">
      <MenuList>
        <MenuItem>
          <div
            onClick={() => {
              navigate("/DashboardAdmin");
            }}
            className="stylediv"
          >
            <div>
              <DashboardOutlinedIcon sx={{ color: "#F51534" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>Dashboard</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem>
          <div
            onClick={() => {
              navigate("/Listcategories");
            }}
            className="stylediv"
          >
            <div>
              <AspectRatioOutlinedIcon sx={{ color: "#1C15F5" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>Categories</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />

        <MenuItem>
          <div
            onClick={() => {
              navigate("/Listscategories");
            }}
            className="stylediv"
          >
            <div>
              <ArticleOutlinedIcon sx={{ color: "#316610" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>Sub Categories</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />

        <MenuItem>
          <div
            onClick={() => {
              navigate("/Listarticles");
            }}
            className="stylediv"
          >
            <div>
              <ReceiptLongOutlinedIcon sx={{ color: "#991793" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>Products</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />

        <MenuItem>
          <div
            onClick={() => {
              navigate("/ListOrders");
            }}
            className="stylediv"
          >
            <div>
              <AssignmentOutlinedIcon sx={{ color: "#FFC300" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>Orders</Typography>
            </div>
          </div>
        </MenuItem>
        <Divider />

        <MenuItem>
          <div
            onClick={() => {
              navigate("/Listarticles/c");
            }}
            className="stylediv"
          >
            <div>
              <ArchiveOutlinedIcon sx={{ color: "#4190A2" }} />
            </div>
            <div>
              <Typography sx={{ color: "gray" }}>PDF</Typography>
            </div>
          </div>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default AdminSidebar;
