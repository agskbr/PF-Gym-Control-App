const validateForm = (inputs) => {
  let errors = {};

  if (!inputs.name) {
    errors.name = "El nombre es requerido";
  }
  if (!inputs.image) {
    errors.image = "La imagen es requerida";
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
  if (!inputs.day.length) {
    errors.day = "Debe seleccionar al menos un dia";
  }
  if (!inputs.hour.length) {
    errors.hour = "Debe seleccionar al menos un horario";
  }

  return errors;
};

export { validateForm };
