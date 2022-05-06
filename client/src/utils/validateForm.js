const validateForm = (inputs, type) => {
  let errors = {};

  if (type === "Usuarios") {
    if (!inputs.name) {
      errors.name = "El nombre es requerido";
    }
    if (!inputs.lastName) {
      errors.lastName = "El apellido es requerido";
    }
    if (!inputs.email) {
      errors.email = "El email es requerido";
    }
    if (!inputs.phoneNumber) {
      errors.phoneNumber = "El número de teléfono es requerido";
    }
    if (!inputs.password) {
      errors.password = "La contraseña es requerida";
    }
    if (!inputs.image) {
      errors.image = "La imagen es requerida";
    }
  }
  if (type === "Clases") {
    if (!inputs.name) {
      errors.name = "El nombre es requerido";
    }
    if (!inputs.image) {
      errors.image = "La images es requerida";
    }
    if (!inputs.video) {
      errors.video = "El video es requerido";
    }
    if (!inputs.description) {
      errors.description = "La descripcion es requerida";
    }
    if (!inputs.price) {
      errors.price = "El precio es requerido";
    }
    if (!inputs.capacity) {
      errors.capacity = "La capacidad es requerida";
    } else if (inputs.capacity < 0) {
      errors.capacity = "Solo valores positivos";
    }
    // if (!inputs.day.length) {
    //   errors.day = "Debe seleccionar al menos un dia";
    // }
    // if (!inputs.hour.length) {
    //   errors.hour = "Debe seleccionar al menos un horario";
    // }
    // if (!inputs.trainers.length) {
    //   errors.trainers = "Debe seleccionar instructor";
    // }
  }

  return errors;
};

export { validateForm };
