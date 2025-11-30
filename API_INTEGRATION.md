# API Integration Documentation

## Overview

This document describes the complete API integration for the Sunweb Solutions frontend application. The application is built with Next.js 15 and integrates with the backend API at `https://sunwebsolution.com/api`.

---

## 📁 Project Structure

```
app/
├── lib/
│   ├── Axios.js                 # Configured Axios instance with CSRF support
│   ├── services/                # API service layer
│   │   ├── servicesApi.js      # Services endpoints
│   │   ├── projectsApi.js      # Projects endpoints
│   │   ├── booksApi.js         # Bookings endpoints
│   │   ├── faqsApi.js          # FAQs endpoints
│   │   ├── benefitsApi.js      # Benefits endpoints
│   │   ├── futuresApi.js       # Futures endpoints
│   │   ├── stepsApi.js         # Steps endpoints
│   │   ├── attributesApi.js    # Attributes endpoints
│   │   ├── usersApi.js         # Users endpoints
│   │   └── index.js            # Export all services
│   └── hooks/                   # Custom React hooks
│       ├── useApi.js           # Generic API hook
│       ├── useServices.js      # Services hooks
│       ├── useProjects.js      # Projects hooks
│       ├── useBookings.js      # Bookings hooks
│       ├── useFaqs.js          # FAQs hooks
│       └── index.js            # Export all hooks
```

---

## 🔧 Configuration

### Axios Instance

The Axios instance is configured in `app/lib/Axios.js` with the following features:

- **Base URL**: `https://sunwebsolution.com/api`
- **Timeout**: 10 seconds
- **CSRF Token Support**: Automatically extracts and sends `XSRF-TOKEN` from cookies
- **Error Handling**: Centralized error handling for 401, 422, and 500 errors
- **Credentials**: Sends cookies with every request (`withCredentials: true`)

```javascript
import Axios from './lib/Axios';

// The instance is already configured and ready to use
```

---

## 📡 API Services

### Available Resources

1. **Services** - `/services`
2. **Projects** - `/projects`
3. **Books (Bookings)** - `/books`
4. **FAQs** - `/faqs`
5. **Benefits** - `/benefits`
6. **Futures** - `/futures`
7. **Steps** - `/steps`
8. **Attributes** - `/attributes`
9. **Users** - `/users`

### Service Methods

Each service provides the following methods:

- `getAll{Resource}(params)` - Get all items with optional query parameters
- `get{Resource}ById(id)` - Get a single item by ID
- `create{Resource}(data)` - Create a new item
- `update{Resource}(id, data)` - Update an existing item
- `delete{Resource}(id)` - Delete an item

### Example Usage

```javascript
import * as servicesApi from './lib/services/servicesApi';

// Get all services
const services = await servicesApi.getAllServices();

// Get single service
const service = await servicesApi.getServiceById(1);

// Create service
const newService = await servicesApi.createService({
  name: "Web Development",
  slug: "web-development",
  description: "Custom web solutions",
  parent_id: null
});

// Update service
const updated = await servicesApi.updateService(1, {
  name: "Updated Service Name"
});

// Delete service
await servicesApi.deleteService(1);
```

---

## 🪝 Custom Hooks

### Generic Hooks

#### `useApi(apiFunction, immediate)`

Generic hook for any API call with loading, error, and data states.

```javascript
import { useApi } from './lib/hooks/useApi';
import { getAllServices } from './lib/services/servicesApi';

function MyComponent() {
  const { data, loading, error, execute } = useApi(getAllServices, true);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

#### `useList(apiFunction, params)`

Hook for fetching lists of items.

```javascript
import { useList } from './lib/hooks/useApi';
import { getAllServices } from './lib/services/servicesApi';

function ServicesList() {
  const { items, loading, error, refetch } = useList(getAllServices, {});

  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### Resource-Specific Hooks

#### Services Hooks

```javascript
import { useServices, useService, useServiceMutations } from './lib/hooks/useServices';

function ServicesComponent() {
  // Get all services
  const { services, loading, error, refetch } = useServices();

  // Get single service
  const { service, loading: loadingService } = useService(serviceId);

  // Mutations
  const { createService, updateService, deleteService, loading: mutating } = useServiceMutations();

  const handleCreate = async () => {
    await createService({ name: "New Service", slug: "new-service" });
    refetch();
  };

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>{service.name}</div>
      ))}
      <button onClick={handleCreate}>Add Service</button>
    </div>
  );
}
```

#### Projects Hooks

```javascript
import { useProjects, useProject, useProjectMutations } from './lib/hooks/useProjects';

function ProjectsComponent() {
  const { projects, loading, error } = useProjects();
  const { createProject, updateProject, deleteProject } = useProjectMutations();

  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

#### Bookings Hooks

```javascript
import { useBookings, useBooking, useBookingMutations } from './lib/hooks/useBookings';

function BookingForm() {
  const { createBooking, loading, error, success } = useBookingMutations();

  const handleSubmit = async (formData) => {
    try {
      await createBooking({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service_id: formData.service_id,
        message: formData.message
      });
      alert('Booking submitted successfully!');
    } catch (err) {
      alert('Failed to submit booking');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## 🎯 Real-World Examples

### 1. Services List Page

**File**: `app/services/ServeicesSection3.js`

This component fetches and displays all services:

```javascript
import { useServices } from "../lib/hooks/useServices";

const ServicesSection3 = () => {
  const { services, loading, error } = useServices();

  return (
    <section>
      {loading && <p>Loading services...</p>}
      {error && <p>Error: {error}</p>}

      {services?.map((service) => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </section>
  );
};
```

### 2. Projects Gallery

**File**: `app/projects/ProjectsSection2.js`

This component displays projects from the API:

```javascript
import { useProjects } from "../lib/hooks/useProjects";

const ProjectsSection2 = () => {
  const { projects, loading, error } = useProjects();

  return (
    <div>
      {projects?.map((project) => (
        <Link href={`/projects/${project.slug}`} key={project.id}>
          <img src={project.seo?.cover} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </Link>
      ))}
    </div>
  );
};
```

### 3. Booking Form

**File**: `app/book/BookingSection2.js`

This component handles booking submissions:

```javascript
import { useServices } from "../lib/hooks/useServices";
import { useBookingMutations } from "../lib/hooks/useBookings";
import { toast } from "react-toastify";

const BookingSection2 = () => {
  const { services } = useServices();
  const { createBooking, loading } = useBookingMutations();
  const [formData, setFormData] = useState({...});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking(formData);
      toast.success("Booking submitted successfully!");
      setFormData({...}); // Reset form
    } catch (err) {
      toast.error("Failed to submit booking");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="phone" value={formData.phone} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <select name="service_id" value={formData.service_id} onChange={handleChange}>
        {services?.map(service => (
          <option key={service.id} value={service.id}>{service.name}</option>
        ))}
      </select>
      <textarea name="message" value={formData.message} onChange={handleChange} />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit now"}
      </button>
    </form>
  );
};
```

### 4. Admin Services Management

**File**: `app/admin/services-example/page.js`

Complete CRUD operations for services:

```javascript
import { useServices, useServiceMutations } from '../../lib/hooks/useServices';

const ServicesExamplePage = () => {
  const { services, loading, refetch } = useServices();
  const { createService, updateService, deleteService } = useServiceMutations();

  const handleCreate = async (data) => {
    await createService(data);
    refetch();
  };

  const handleUpdate = async (id, data) => {
    await updateService(id, data);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteService(id);
    refetch();
  };

  return (
    <div>
      <table>
        {services?.map(service => (
          <tr key={service.id}>
            <td>{service.name}</td>
            <td>
              <button onClick={() => handleEdit(service)}>Edit</button>
              <button onClick={() => handleDelete(service.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
```

---

## 🔐 Authentication & CSRF

The API uses Laravel Sanctum for authentication with CSRF token protection:

1. **CSRF Token**: Automatically extracted from `XSRF-TOKEN` cookie
2. **Credentials**: All requests include cookies (`withCredentials: true`)
3. **Headers**: Automatically adds `X-XSRF-TOKEN` header to all requests

No additional configuration needed - it's all handled in the Axios instance.

---

## 📝 API Response Format

All API responses follow this structure:

```json
{
  "data": {
    // Resource data or array of resources
  }
}
```

Error responses (422 validation errors):

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

---

## 🚀 Best Practices

1. **Always use hooks in components** instead of calling API functions directly
2. **Handle loading and error states** in your UI
3. **Refetch data after mutations** to keep UI in sync
4. **Use toast notifications** for user feedback
5. **Implement proper error handling** with try/catch blocks
6. **Validate form data** before submission
7. **Use TypeScript** (optional) for better type safety

---

## 📚 Additional Resources

- **API Documentation**: https://sunwebsolution.com/docs/api
- **Next.js Documentation**: https://nextjs.org/docs
- **Axios Documentation**: https://axios-http.com/docs/intro

---

## 🛠️ Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure:
1. Backend allows `https://your-domain.com` in CORS configuration
2. Credentials are properly configured (`withCredentials: true`)

### 401 Unauthorized

- Make sure CSRF token is being sent correctly
- Check that cookies are enabled in the browser
- Verify authentication session is active

### 422 Validation Errors

- Check API documentation for required fields
- Ensure data types match API requirements
- Validate form data before submission

---

## 📞 Support

For issues or questions:
- Open an issue in the repository
- Contact the development team
- Check the API documentation

---

**Last Updated**: November 2025
**Version**: 1.0.0
