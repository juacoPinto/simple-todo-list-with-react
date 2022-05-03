import React, { useEffect, useReducer, useState } from "react";
import { todoReducer } from "./todoReducer";
import { useForm } from "./useForm";

const init = () => {
	return JSON.parse(localStorage.getItem("todos")) || [];
	/* {
			id: new Date().getTime(),
			descripcion: "React",
			donde: false,
		}, */
};

export const ToDoApp = () => {
	const [todos, dispatch] = useReducer(todoReducer, [], init);

	const [{ description }, handleInputChange, reset] = useForm({
		description: "",
	});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleDelete = (todoId) => {
		const action = {
			type: "delete",
			payload: todoId,
		};

		dispatch(action);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (description.trim().length < 1) {
			return;
		}

		const newTodo = {
			id: new Date().getTime(),
			descripcion: description,
			done: false,
		};

		const action = {
			type: "add",
			payload: newTodo,
		};

		dispatch(action);
		reset();
	};

	return (
		<>
			<section className="vh-100">
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col col-xl-10">
							<div className="card">
								<div className="card-body p-5">
									<h1 className="mb-3">Todos {todos.length} </h1>

									<form
										onSubmit={handleSubmit}
										className="d-flex justify-content-center align-items-center mb-4"
									>
										<div className="form-outline flex-fill">
											<input
												name="description"
												type="text"
												id="form3"
												class="form-control form-control-lg"
												value={description}
												onChange={handleInputChange}
											/>
											<label className="form-label" for="form3">
												Agrega una nueva Tarea
											</label>
										</div>
										<button
											type="submit"
											className="btn btn-primary btn-lg ms-2"
										>
											Agregar
										</button>
									</form>

									<ul className="list-group mb-0">
										{todos.map((todo) => (
											<li
												key={todo.id}
												className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
											>
												<div className="d-flex align-items-center">
													<input
														className="form-check-input me-2"
														type="checkbox"
														value=""
														aria-label="..."
													/>
													{todo.descripcion}
												</div>
												<button
													className="btn btn-danger"
													onClick={() => handleDelete(todo.id)}
												>
													borrar
												</button>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
