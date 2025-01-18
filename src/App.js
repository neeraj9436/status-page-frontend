// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import {
//   Container, Paper, Typography, Grid, Card, CardContent,
//   Button, TextField, Dialog, DialogTitle, DialogContent,
//   DialogActions, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, IconButton, Box
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
// import axios from 'axios';

// const API_URL = 'http://localhost:8000';

// function App() {
//   const [services, setServices] = useState([]);
//   const [incidents, setIncidents] = useState([]);
//   const [openServiceDialog, setOpenServiceDialog] = useState(false);
//   const [openIncidentDialog, setOpenIncidentDialog] = useState(false);
//   const [editingService, setEditingService] = useState(null);
//   const [serviceForm, setServiceForm] = useState({
//     name: '',
//     description: '',
//     status: 'operational'
//   });
//   const [incidentForm, setIncidentForm] = useState({
//     service_id: '',
//     title: '',
//     description: '',
//     status: 'investigating'
//   });

//   useEffect(() => {
//     fetchServices();
//     fetchIncidents();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/services`);
//       setServices(response.data);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     }
//   };

//   const fetchIncidents = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/incidents`);
//       setIncidents(response.data);
//     } catch (error) {
//       console.error('Error fetching incidents:', error);
//     }
//   };

//   const handleServiceSubmit = async () => {
//     try {
//       if (editingService) {
//         await axios.put(`${API_URL}/services/${editingService.id}`, serviceForm);
//       } else {
//         await axios.post(`${API_URL}/services`, serviceForm);
//       }
//       setOpenServiceDialog(false);
//       setEditingService(null);
//       setServiceForm({ name: '', description: '', status: 'operational' });
//       fetchServices();
//     } catch (error) {
//       console.error('Error saving service:', error);
//     }
//   };

//   const handleEditService = (service) => {
//     setEditingService(service);
//     setServiceForm({
//       name: service.name,
//       description: service.description,
//       status: service.status
//     });
//     setOpenServiceDialog(true);
//   };

//   const handleIncidentSubmit = async () => {
//     try {
//       await axios.post(`${API_URL}/incidents`, incidentForm);
//       setOpenIncidentDialog(false);
//       setIncidentForm({
//         service_id: '',
//         title: '',
//         description: '',
//         status: 'investigating'
//       });
//       fetchIncidents();
//       fetchServices(); // Refresh services to reflect any status changes
//     } catch (error) {
//       console.error('Error saving incident:', error);
//     }
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       operational: '#4caf50',
//       degraded: '#ff9800',
//       outage: '#f44336',
//       maintenance: '#2196f3',
//       investigating: '#757575',
//       identified: '#ffc107',
//       monitoring: '#8bc34a',
//       resolved: '#4caf50'
//     };
//     return colors[status.toLowerCase()] || '#757575';
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header */}
//       <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           System Status Dashboard
//         </Typography>
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => setOpenServiceDialog(true)}
//           >
//             Add Service
//           </Button>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => setOpenIncidentDialog(true)}
//           >
//             Report Incident
//           </Button>
//         </Box>
//       </Paper>

//       {/* Services Grid */}
//       <Typography variant="h5" gutterBottom>
//         Services Status
//       </Typography>
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {services.map((service) => (
//           <Grid item xs={12} sm={6} md={4} key={service.id}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography variant="h6">{service.name}</Typography>
//                   <IconButton onClick={() => handleEditService(service)}>
//                     <EditIcon />
//                   </IconButton>
//                 </Box>
//                 <Typography color="textSecondary" gutterBottom>
//                   {service.description}
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: 'inline-block',
//                     px: 2,
//                     py: 0.5,
//                     borderRadius: 1,
//                     bgcolor: getStatusColor(service.status),
//                     color: 'white'
//                   }}
//                 >
//                   {service.status}
//                 </Box>
//                 <Typography variant="caption" display="block" sx={{ mt: 1 }}>
//                   Last updated: {new Date(service.last_updated).toLocaleString()}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Incidents Table */}
//       <Typography variant="h5" gutterBottom>
//         Recent Incidents
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Service</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {incidents.map((incident) => (
//               <TableRow key={incident.id}>
//                 <TableCell>
//                   {new Date(incident.created_at).toLocaleString()}
//                 </TableCell>
//                 <TableCell>
//                   {services.find(s => s.id === incident.service_id)?.name}
//                 </TableCell>
//                 <TableCell>{incident.title}</TableCell>
//                 <TableCell>{incident.description}</TableCell>
//                 <TableCell>
//                   <Box
//                     sx={{
//                       display: 'inline-block',
//                       px: 2,
//                       py: 0.5,
//                       borderRadius: 1,
//                       bgcolor: getStatusColor(incident.status),
//                       color: 'white'
//                     }}
//                   >
//                     {incident.status}
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Service Dialog */}
//       <Dialog 
//         open={openServiceDialog} 
//         onClose={() => {
//           setOpenServiceDialog(false);
//           setEditingService(null);
//           setServiceForm({ name: '', description: '', status: 'operational' });
//         }}
//       >
//         <DialogTitle>
//           {editingService ? 'Edit Service' : 'Add New Service'}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             label="Name"
//             value={serviceForm.name}
//             onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             value={serviceForm.description}
//             onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
//             margin="normal"
//             multiline
//             rows={2}
//           />
//           <TextField
//             fullWidth
//             select
//             label="Status"
//             value={serviceForm.status}
//             onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
//             margin="normal"
//             SelectProps={{
//               native: true,
//             }}
//           >
//             <option value="operational">Operational</option>
//             <option value="degraded">Degraded</option>
//             <option value="outage">Outage</option>
//             <option value="maintenance">Maintenance</option>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={() => {
//               setOpenServiceDialog(false);
//               setEditingService(null);
//               setServiceForm({ name: '', description: '', status: 'operational' });
//             }}
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleServiceSubmit} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Incident Dialog */}
//       <Dialog 
//         open={openIncidentDialog} 
//         onClose={() => {
//           setOpenIncidentDialog(false);
//           setIncidentForm({
//             service_id: '',
//             title: '',
//             description: '',
//             status: 'investigating'
//           });
//         }}
//       >
//         <DialogTitle>Report New Incident</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             select
//             label="Service"
//             value={incidentForm.service_id}
//             onChange={(e) => setIncidentForm({ ...incidentForm, service_id: e.target.value })}
//             margin="normal"
//             SelectProps={{
//               native: true,
//             }}
//           >
//             <option value="">Select a service</option>
//             {services.map((service) => (
//               <option key={service.id} value={service.id}>
//                 {service.name}
//               </option>
//             ))}
//           </TextField>
//           <TextField
//             fullWidth
//             label="Title"
//             value={incidentForm.title}
//             onChange={(e) => setIncidentForm({ ...incidentForm, title: e.target.value })}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Description"
//             value={incidentForm.description}
//             onChange={(e) => setIncidentForm({ ...incidentForm, description: e.target.value })}
//             margin="normal"
//             multiline
//             rows={3}
//           />
//           <TextField
//             fullWidth
//             select
//             label="Status"
//             value={incidentForm.status}
//             onChange={(e) => setIncidentForm({ ...incidentForm, status: e.target.value })}
//             margin="normal"
//             SelectProps={{
//               native: true,
//             }}
//           >
//             <option value="investigating">Investigating</option>
//             <option value="identified">Identified</option>
//             <option value="monitoring">Monitoring</option>
//             <option value="resolved">Resolved</option>
//           </TextField>
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={() => {
//               setOpenIncidentDialog(false);
//               setIncidentForm({
//                 service_id: '',
//                 title: '',
//                 description: '',
//                 status: 'investigating'
//               });
//             }}
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleIncidentSubmit} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

// export default App;



////////////////////////////// Admin - User //////////////////////////////////




import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Typography, Grid, Card, CardContent,
  Button, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Box, Tabs, Tab
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// TabPanel component for tab content
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ padding: '20px 0' }}>
      {value === index && children}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0); // 0 for landing, 1 for user, 2 for admin
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [openIncidentDialog, setOpenIncidentDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    status: 'operational'
  });
  const [incidentForm, setIncidentForm] = useState({
    service_id: '',
    title: '',
    description: '',
    status: 'investigating'
  });

  useEffect(() => {
    fetchServices();
    fetchIncidents();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchIncidents = async () => {
    try {
      const response = await axios.get(`${API_URL}/incidents`);
      setIncidents(response.data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    }
  };

  const handleServiceSubmit = async () => {
    try {
      if (editingService) {
        await axios.put(`${API_URL}/services/${editingService.id}`, serviceForm);
      } else {
        await axios.post(`${API_URL}/services`, serviceForm);
      }
      setOpenServiceDialog(false);
      setEditingService(null);
      setServiceForm({ name: '', description: '', status: 'operational' });
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      status: service.status
    });
    setOpenServiceDialog(true);
  };

  const handleIncidentSubmit = async () => {
    try {
      await axios.post(`${API_URL}/incidents`, incidentForm);
      setOpenIncidentDialog(false);
      setIncidentForm({
        service_id: '',
        title: '',
        description: '',
        status: 'investigating'
      });
      fetchIncidents();
      fetchServices();
    } catch (error) {
      console.error('Error saving incident:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      operational: '#4caf50',
      degraded: '#ff9800',
      outage: '#f44336',
      maintenance: '#2196f3',
      investigating: '#757575',
      identified: '#ffc107',
      monitoring: '#8bc34a',
      resolved: '#4caf50'
    };
    return colors[status.toLowerCase()] || '#757575';
  };

  // Landing Page Content
  const LandingPage = () => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to System Status Dashboard
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Please select your role to continue:
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setTabValue(1)}
        >
          View as User
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => setTabValue(2)}
        >
          Login as Administrator
        </Button>
      </Box>
    </Box>
  );

  // User View Content
  const UserView = () => (
    <>
      <Typography variant="h5" gutterBottom>
        Current Service Status
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{service.name}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {service.description}
                </Typography>
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: getStatusColor(service.status),
                    color: 'white'
                  }}
                >
                  {service.status}
                </Box>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Last updated: {new Date(service.last_updated).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        Recent Incidents
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>
                  {new Date(incident.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {services.find(s => s.id === incident.service_id)?.name}
                </TableCell>
                <TableCell>{incident.title}</TableCell>
                <TableCell>{incident.description}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: getStatusColor(incident.status),
                      color: 'white'
                    }}
                  >
                    {incident.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // Admin View Content
  const AdminView = () => (
    <>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Administrator Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenServiceDialog(true)}
          >
            Add Service
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenIncidentDialog(true)}
          >
            Report Incident
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Manage Services
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">{service.name}</Typography>
                  <IconButton onClick={() => handleEditService(service)}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {service.description}
                </Typography>
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: getStatusColor(service.status),
                    color: 'white'
                  }}
                >
                  {service.status}
                </Box>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Last updated: {new Date(service.last_updated).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        Incident History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>
                  {new Date(incident.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {services.find(s => s.id === incident.service_id)?.name}
                </TableCell>
                <TableCell>{incident.title}</TableCell>
                <TableCell>{incident.description}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: getStatusColor(incident.status),
                      color: 'white'
                    }}
                  >
                    {incident.status}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Navigation Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          centered
        >
          <Tab label="Home" />
          <Tab label="User View" />
          <Tab label="Administrator" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <LandingPage />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <UserView />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <AdminView />
      </TabPanel>

      {/* Dialogs */}
      {/* Service Dialog */}
      <Dialog 
        open={openServiceDialog} 
        onClose={() => {
          setOpenServiceDialog(false);
          setEditingService(null);
          setServiceForm({ name: '', description: '', status: 'operational' });
        }}
      >
        <DialogTitle>
          {editingService ? 'Edit Service' : 'Add New Service'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={serviceForm.name}
            onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={serviceForm.description}
            onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
            margin="normal"
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            select
            label="Status"
            value={serviceForm.status}
            onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="operational">Operational</option>
            <option value="degraded">Degraded</option>
            <option value="outage">Outage</option>
            <option value="maintenance">Maintenance</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenServiceDialog(false);
            setEditingService(null);
            setServiceForm({ name: '', description: '', status: 'operational' });
          }}>
            Cancel
          </Button>
          <Button onClick={handleServiceSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Incident Dialog */}
      <Dialog 
        open={openIncidentDialog} 
        onClose={() => {
          setOpenIncidentDialog(false);
          setIncidentForm({
            service_id: '',
            title: '',
            description: '',
            status: 'investigating'
          });
        }}
      >
        <DialogTitle>Report New Incident</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Service"
            value={incidentForm.service_id}
            onChange={(e) => setIncidentForm({ ...incidentForm, service_id: e.target.value })}
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Title"
            value={incidentForm.title}
            onChange={(e) => setIncidentForm({ ...incidentForm, title: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={incidentForm.description}
            onChange={(e) => setIncidentForm({ ...incidentForm, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            select
            label="Status"
            value={incidentForm.status}
            onChange={(e) => setIncidentForm({ ...incidentForm, status: e.target.value })}
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="investigating">Investigating</option>
            <option value="identified">Identified</option>
            <option value="monitoring">Monitoring</option>
            <option value="resolved">Resolved</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setOpenIncidentDialog(false);
              setIncidentForm({
                service_id: '',
                title: '',
                description: '',
                status: 'investigating'
              });
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleIncidentSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;