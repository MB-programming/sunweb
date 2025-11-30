# توثيق تكامل الـ API

## نظرة عامة

هذا المستند يشرح التكامل الكامل للـ API في تطبيق Sunweb Solutions. التطبيق مبني باستخدام Next.js 15 ويتكامل مع الـ backend API على `https://sunwebsolution.com/api`.

---

## 📁 بنية المشروع

```
app/
├── lib/
│   ├── Axios.js                 # إعدادات Axios مع دعم CSRF
│   ├── services/                # طبقة خدمات الـ API
│   │   ├── servicesApi.js      # نقاط نهاية الخدمات
│   │   ├── projectsApi.js      # نقاط نهاية المشاريع
│   │   ├── booksApi.js         # نقاط نهاية الحجوزات
│   │   ├── faqsApi.js          # نقاط نهاية الأسئلة الشائعة
│   │   ├── benefitsApi.js      # نقاط نهاية الفوائد
│   │   ├── futuresApi.js       # نقاط نهاية المزايا المستقبلية
│   │   ├── stepsApi.js         # نقاط نهاية الخطوات
│   │   ├── attributesApi.js    # نقاط نهاية الخصائص
│   │   ├── usersApi.js         # نقاط نهاية المستخدمين
│   │   └── index.js            # تصدير جميع الخدمات
│   └── hooks/                   # Custom React hooks
│       ├── useApi.js           # Hook عام للـ API
│       ├── useServices.js      # Hooks الخدمات
│       ├── useProjects.js      # Hooks المشاريع
│       ├── useBookings.js      # Hooks الحجوزات
│       ├── useFaqs.js          # Hooks الأسئلة الشائعة
│       └── index.js            # تصدير جميع الـ hooks
```

---

## 🔧 الإعدادات

### Axios Instance

تم إعداد Axios في `app/lib/Axios.js` بالمميزات التالية:

- **Base URL**: `https://sunwebsolution.com/api`
- **Timeout**: 10 ثواني
- **دعم CSRF Token**: استخراج وإرسال `XSRF-TOKEN` تلقائياً
- **معالجة الأخطاء**: معالجة مركزية للأخطاء 401، 422، 500
- **Credentials**: إرسال الـ cookies مع كل طلب

---

## 📡 خدمات الـ API

### الموارد المتاحة

1. **Services** (الخدمات) - `/services`
2. **Projects** (المشاريع) - `/projects`
3. **Books** (الحجوزات) - `/books`
4. **FAQs** (الأسئلة الشائعة) - `/faqs`
5. **Benefits** (الفوائد) - `/benefits`
6. **Futures** (المزايا المستقبلية) - `/futures`
7. **Steps** (الخطوات) - `/steps`
8. **Attributes** (الخصائص) - `/attributes`
9. **Users** (المستخدمون) - `/users`

### دوال الخدمة

كل خدمة توفر الدوال التالية:

- `getAll{Resource}(params)` - جلب جميع العناصر
- `get{Resource}ById(id)` - جلب عنصر واحد بالـ ID
- `create{Resource}(data)` - إنشاء عنصر جديد
- `update{Resource}(id, data)` - تحديث عنصر موجود
- `delete{Resource}(id)` - حذف عنصر

### مثال على الاستخدام

```javascript
import * as servicesApi from './lib/services/servicesApi';

// جلب جميع الخدمات
const services = await servicesApi.getAllServices();

// جلب خدمة واحدة
const service = await servicesApi.getServiceById(1);

// إنشاء خدمة جديدة
const newService = await servicesApi.createService({
  name: "تطوير الويب",
  slug: "web-development",
  description: "حلول ويب مخصصة",
  parent_id: null
});

// تحديث خدمة
const updated = await servicesApi.updateService(1, {
  name: "اسم الخدمة المحدث"
});

// حذف خدمة
await servicesApi.deleteService(1);
```

---

## 🪝 Custom Hooks

### Hooks عامة

#### `useApi(apiFunction, immediate)`

Hook عام لأي استدعاء API مع حالات التحميل والأخطاء والبيانات.

```javascript
import { useApi } from './lib/hooks/useApi';
import { getAllServices } from './lib/services/servicesApi';

function MyComponent() {
  const { data, loading, error, execute } = useApi(getAllServices, true);

  return (
    <div>
      {loading && <p>جاري التحميل...</p>}
      {error && <p>خطأ: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

### Hooks خاصة بالموارد

#### Hooks الخدمات

```javascript
import { useServices, useService, useServiceMutations } from './lib/hooks/useServices';

function ServicesComponent() {
  // جلب جميع الخدمات
  const { services, loading, error, refetch } = useServices();

  // جلب خدمة واحدة
  const { service, loading: loadingService } = useService(serviceId);

  // العمليات (إنشاء، تحديث، حذف)
  const { createService, updateService, deleteService, loading: mutating } = useServiceMutations();

  const handleCreate = async () => {
    await createService({ name: "خدمة جديدة", slug: "new-service" });
    refetch();
  };

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>{service.name}</div>
      ))}
      <button onClick={handleCreate}>إضافة خدمة</button>
    </div>
  );
}
```

---

## 🎯 أمثلة عملية

### 1. صفحة عرض الخدمات

**الملف**: `app/services/ServeicesSection3.js`

```javascript
import { useServices } from "../lib/hooks/useServices";

const ServicesSection3 = () => {
  const { services, loading, error } = useServices();

  return (
    <section>
      {loading && <p>جاري التحميل...</p>}
      {error && <p>خطأ: {error}</p>}

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

### 2. معرض المشاريع

**الملف**: `app/projects/ProjectsSection2.js`

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

### 3. نموذج الحجز

**الملف**: `app/book/BookingSection2.js`

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
      toast.success("تم إرسال الحجز بنجاح!");
      setFormData({...}); // إعادة تعيين النموذج
    } catch (err) {
      toast.error("فشل إرسال الحجز");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="الاسم" />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="الهاتف" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="البريد الإلكتروني" />
      <select name="service_id" value={formData.service_id} onChange={handleChange}>
        <option value="">اختر الخدمة</option>
        {services?.map(service => (
          <option key={service.id} value={service.id}>{service.name}</option>
        ))}
      </select>
      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="الرسالة" />
      <button type="submit" disabled={loading}>
        {loading ? "جاري الإرسال..." : "إرسال الآن"}
      </button>
    </form>
  );
};
```

### 4. لوحة التحكم - إدارة الخدمات

**الملف**: `app/admin/services-example/page.js`

عمليات CRUD كاملة للخدمات:

```javascript
import { useServices, useServiceMutations } from '../../lib/hooks/useServices';

const ServicesExamplePage = () => {
  const { services, loading, refetch } = useServices();
  const { createService, updateService, deleteService } = useServiceMutations();

  const handleCreate = async (data) => {
    await createService(data);
    refetch(); // تحديث القائمة
  };

  const handleUpdate = async (id, data) => {
    await updateService(id, data);
    refetch();
  };

  const handleDelete = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
      await deleteService(id);
      refetch();
    }
  };

  return (
    <div>
      <button onClick={() => handleCreate({...})}>إضافة خدمة جديدة</button>
      <table>
        {services?.map(service => (
          <tr key={service.id}>
            <td>{service.name}</td>
            <td>
              <button onClick={() => handleUpdate(service.id, {...})}>تعديل</button>
              <button onClick={() => handleDelete(service.id)}>حذف</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
```

---

## 🔐 المصادقة و CSRF

الـ API يستخدم Laravel Sanctum للمصادقة مع حماية CSRF token:

1. **CSRF Token**: يتم استخراجه تلقائياً من الـ cookie
2. **Credentials**: جميع الطلبات تتضمن الـ cookies
3. **Headers**: يتم إضافة `X-XSRF-TOKEN` تلقائياً لكل طلب

لا حاجة لأي إعدادات إضافية - كل شيء مُعد في Axios instance.

---

## 📝 صيغة استجابة الـ API

جميع استجابات الـ API تتبع هذه الصيغة:

```json
{
  "data": {
    // بيانات المورد أو مصفوفة من الموارد
  }
}
```

استجابات الأخطاء (422 validation errors):

```json
{
  "message": "البيانات المدخلة غير صحيحة.",
  "errors": {
    "field_name": ["رسالة الخطأ"]
  }
}
```

---

## 🚀 أفضل الممارسات

1. **استخدم دائماً الـ hooks** في المكونات بدلاً من استدعاء دوال الـ API مباشرة
2. **تعامل مع حالات التحميل والأخطاء** في واجهة المستخدم
3. **حدّث البيانات بعد العمليات** للحفاظ على تزامن الواجهة
4. **استخدم إشعارات toast** لتنبيه المستخدم
5. **نفّذ معالجة صحيحة للأخطاء** باستخدام try/catch
6. **تحقق من بيانات النموذج** قبل الإرسال

---

## 🛠️ حل المشاكل

### مشاكل CORS

إذا واجهت أخطاء CORS:
1. تأكد من أن الـ backend يسمح بنطاقك في إعدادات CORS
2. تأكد من إعدادات الـ credentials صحيحة

### 401 Unauthorized

- تأكد من إرسال CSRF token بشكل صحيح
- تحقق من تفعيل الـ cookies في المتصفح
- تأكد من أن جلسة المصادقة نشطة

### 422 Validation Errors

- راجع توثيق الـ API للحقول المطلوبة
- تأكد من تطابق أنواع البيانات مع متطلبات الـ API
- تحقق من بيانات النموذج قبل الإرسال

---

## 📚 موارد إضافية

- **توثيق الـ API**: https://sunwebsolution.com/docs/api
- **توثيق Next.js**: https://nextjs.org/docs
- **توثيق Axios**: https://axios-http.com/docs/intro

---

**آخر تحديث**: نوفمبر 2025
**النسخة**: 1.0.0
