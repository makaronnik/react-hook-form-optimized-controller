# 📦 react-hook-form-optimized-controller

⚡ **An optimized `Controller` for `react-hook-form` that minimizes unnecessary re-renders**

## 🚀 **What is this and why does it exist?**

This package was created as an **optimized alternative** to the default `Controller` from [react-hook-form](https://react-hook-form.com/).

The original `Controller` subscribes to updates from `fieldState` and `formState`, which **causes excessive re-renders**, even when they are not needed. This package solves that problem by **only subscribing to `value` and `disabled`**, significantly improving performance when working with controlled components.

---

## 🎯 **What problem does it solve?**

By default, `Controller` in `react-hook-form` **re-renders the controlled component every time any field state updates**, including:

-   ✅ `value` (✔ needed for updates)
-   ✅ `disabled` (✔ needed for updates)
-   ❌ `isDirty` (causes extra re-renders)
-   ❌ `isTouched` (causes extra re-renders)
-   ❌ `isValid` (causes extra re-renders)
-   ❌ `formState` updates

This means **even if you don’t use `isDirty` or `isTouched`, they can still trigger re-renders**.

With `react-hook-form-optimized-controller`, **your component will only re-render when `value` or `disabled` changes**, **reducing unnecessary re-renders** and improving form performance.

---

## ⚠ **Limitations**

While this package improves performance, it comes with **some trade-offs**:

✅ **Optimized for controlled components** – Works best when you control `value` through `react-hook-form`.  
❌ **No access to `fieldState` and `formState` in `render`** – If you rely on `isDirty`, `isTouched`, or `errors`, you need to access them separately using `useFormState()`.

**If you need access to `formState` or `fieldState`, use the original `Controller` from `react-hook-form`.**

---

## 📖 **Installation**

```sh
npm install react-hook-form-optimized-controller
# or
yarn add react-hook-form-optimized-controller
```

---

## 💡 **Usage**

```tsx
import { useForm } from 'react-hook-form';
import OptimizedFieldController from 'react-hook-form-optimized-controller';

function MyForm() {
	const { control } = useForm({
		defaultValues: { username: '' },
	});

	return (
		<form>
			{/* OptimizedFieldController only subscribes to 'value' and 'disabled' */}
			<OptimizedFieldController
				control={control}
				name='username'
				render={({ onChange, onBlur, value, ref }) => (
					<input
						onChange={onChange} // Sends value to react-hook-form
						onBlur={onBlur} // Notifies when input is touched
						value={value} // Keeps value in sync
						ref={ref} // Ref for focus management
					/>
				)}
			/>
		</form>
	);
}
```

---

## 🛠 **API**

The API is similar to `Controller` but with an **important difference**:

### **Props**

| Prop      | Type                                                        | Required | Description                                      |
| --------- | ----------------------------------------------------------- | -------- | ------------------------------------------------ |
| `control` | `Control<TFieldValues>`                                     | ✅       | React Hook Form's `control` object               |
| `name`    | `string`                                                    | ✅       | The field name                                   |
| `render`  | `(field: { onChange, onBlur, value, ref }) => ReactElement` | ✅       | The render function for the controlled component |

### **Differences from `Controller`**

| Feature                                     | `Controller` | `OptimizedFieldController` |
| ------------------------------------------- | ------------ | -------------------------- |
| Subscribes to `value`                       | ✅           | ✅                         |
| Subscribes to `disabled`                    | ✅           | ✅                         |
| Subscribes to `fieldState`                  | ✅           | ❌                         |
| Subscribes to `formState`                   | ✅           | ❌                         |
| Access to `isTouched`, `isDirty`, `isValid` | ✅           | ❌                         |
| Access to `errors`                          | ✅           | ❌                         |
| Prevents unnecessary re-renders             | ❌           | ✅                         |

---

## 🚀 **Performance Benefits**

This package is especially useful in **large forms with many controlled components**, where frequent updates to `fieldState` and `formState` can slow down rendering. By **only updating on `value` and `disabled` changes**, you:

✅ **Reduce unnecessary re-renders**  
✅ **Improve form performance**  
✅ **Ensure smooth UI updates**

---

## 🛠 **Advanced Usage**

If you need access to `fieldState` or `formState`, use `useFormState()` separately:

```tsx
import { useForm, useFormState } from 'react-hook-form';
import OptimizedFieldController from 'react-hook-form-optimized-controller';

function MyForm() {
	const { control } = useForm();
	const { errors } = useFormState({ control });

	return (
		<form>
			<OptimizedFieldController
				control={control}
				name='email'
				render={(field) => (
					<>
						<input {...field} />
						{errors.email && <span>{errors.email.message}</span>}
					</>
				)}
			/>
		</form>
	);
}
```

---

## 💬 **Why use this package?**

This package is perfect for developers who:

✅ **Use `react-hook-form` with controlled components**  
✅ **Want to optimize form performance and prevent excessive re-renders**  
✅ **Don't need `fieldState` or `formState` inside `render`**  
✅ **Prefer a cleaner, more efficient implementation of `Controller`**

---

## 🎯 **Conclusion**

`react-hook-form-optimized-controller` is a **lightweight, high-performance alternative** to the default `Controller`.  
If you need **faster, less re-rendering forms**, this package is for you!

🔧 **Open to contributions?** Yes! Feel free to report issues, request features, or submit PRs. 🚀

---

## 📜 **License**

MIT License – free for both personal and commercial use.
