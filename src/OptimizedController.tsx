import { useMemo, type ReactElement } from 'react';
import {
	useController,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from 'react-hook-form';

/**
 * Optimized version of `Controller` from react-hook-form.
 *
 * This component is based on `useController` and is designed to minimize unnecessary re-renders.
 *
 * Key differences from the original `Controller`:
 * - 🚀 Only `field` is passed to `render` – no `fieldState` or `formState`
 * - 🔄 Subscribes only to `value` and `disabled` to avoid unnecessary updates
 * - ⚡ More efficient rendering for controlled components
 *
 * @param props - The name of the field and the validation rules.
 *
 * @returns Provides field handler functions and value updates without unnecessary re-renders.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control } = useForm<FormValues>({
 *     defaultValues: {
 *       test: ""
 *     }
 *   });
 *
 *   return (
 *     <form>
 *       <OptimizedController
 *         control={control}
 *         name="test"
 *         render={(field) => ( // ✅ `render` now only receives `field`
 *           <input
 *             {...field} // ✅ Works just like react-hook-form's Controller
 *           />
 *         )}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
export type OptimizedControllerProps<
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
	render: (
		field: ReturnType<typeof useController<TFieldValues, TName>>['field']
	) => ReactElement;
};

function OptimizedController<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: OptimizedControllerProps<TFieldValues, TName>) {
	const { render } = props;

	const { field } = useController<TFieldValues, TName>(props);

	const { value, disabled } = field;

	return useMemo(() => render(field), [value, disabled, render]);
}

export default OptimizedController;
