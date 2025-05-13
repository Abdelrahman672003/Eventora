import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEventTemplate = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
  validationErrors,
  imagePreview,
  setImagePreview,
  isEdit,
}) => {
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      handleChange({
        target: {
          name: "image",
          value: file,
        },
      });
    }
  };

  const handleDateChange = (date) => {
    handleChange({
      target: {
        name: "date",
        value: date.toISOString().split("T")[0],
      },
    });
  };

  const handleTimeChange = (time) => {
    handleChange({
      target: {
        name: "time",
        value: time.toTimeString().slice(0, 5),
      },
    });
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      const newTags = [...(formData.tags || []), tagInput.trim()];
      handleChange({
        target: {
          name: "tags",
          value: newTags,
        },
      });
      setTagInput("");
    }
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = formData.tags.filter((_, index) => index !== indexToRemove);
    handleChange({
      target: {
        name: "tags",
        value: newTags,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-30 pb-12">
      <div className="max-w-5xl mx-auto px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary mb-4 cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEdit ? "Edit Event" : "Add New Event"}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {isEdit
              ? "Update the event details below"
              : "Fill in the details below to create a new event"}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Event Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full bg-gray-50 border ${
                  validationErrors.name ? "border-red-500" : "border-gray-200"
                } rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                placeholder="Enter event name"
              />
              {validationErrors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className={`w-full bg-gray-50 border ${
                  validationErrors.description
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                placeholder="Enter event description"
              />
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Date
                </label>
                <DatePicker
                  selected={formData.date ? new Date(formData.date) : null}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  className={`w-full bg-gray-50 border ${
                    validationErrors.date ? "border-red-500" : "border-gray-200"
                  } rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  placeholderText="Select date"
                  required
                  minDate={new Date()}
                />
                {validationErrors.date && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.date}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Time
                </label>
                <DatePicker
                  selected={
                    formData.time
                      ? new Date(`2000-01-01T${formData.time}`)
                      : null
                  }
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className={`w-full bg-gray-50 border ${
                    validationErrors.time ? "border-red-500" : "border-gray-200"
                  } rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  placeholderText="Select time"
                  required
                />
                {validationErrors.time && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.time}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="venue"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Venue
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                className={`w-full bg-gray-50 border ${
                  validationErrors.venue ? "border-red-500" : "border-gray-200"
                } rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                placeholder="Enter event venue"
              />
              {validationErrors.venue && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.venue}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={`w-full bg-gray-50 border ${
                    validationErrors.category
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                >
                  <option value="">Select a category</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Educational & Business">
                    Educational & Business
                  </option>
                  <option value="Cultural & Arts">Cultural & Arts</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Technology & Innovation">
                    Technology & Innovation
                  </option>
                  <option value="Travel & Adventure">Travel & Adventure</option>
                </select>
                {validationErrors.category && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.category}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className={`w-full bg-gray-50 border ${
                    validationErrors.price
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                  placeholder="Enter ticket price"
                />
                {validationErrors.price && (
                  <p className="mt-1 text-sm text-red-500">
                    {validationErrors.price}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="totalTickets"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Total Tickets Available
              </label>
              <input
                type="number"
                id="totalTickets"
                name="totalTickets"
                value={formData.totalTickets}
                onChange={handleChange}
                required
                min="1"
                max="10000"
                className={`w-full bg-gray-50 border ${
                  validationErrors.totalTickets
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary shadow-sm placeholder-gray-400 transition dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                placeholder="Enter total number of tickets"
              />
              {validationErrors.totalTickets && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.totalTickets}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Tags
              </label>
              <div
                className={`w-full bg-gray-50 border ${
                  validationErrors.tags ? "border-red-500" : "border-gray-200"
                } rounded-xl px-4 py-3 text-sm focus-within:ring-2 focus-within:ring-secondary shadow-sm transition dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-2 text-primary hover:text-primary/80"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="tags"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagInputKeyDown}
                    className="flex-1 bg-transparent border-none focus:outline-none"
                    placeholder="Type a tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-1 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
              {validationErrors.tags && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.tags}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Event Image
              </label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                  validationErrors.image
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } border-dashed rounded-xl`}
              >
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="mb-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 w-auto object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept=".png,.jpg,.jpeg,.gif,image/png,image/jpg,image/jpeg,image/gif"
                        onChange={handleImageChange}
                        className="sr-only"
                        required={!isEdit}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG, GIF up to 5MB
                  </p>
                </div>
              </div>
              {validationErrors.image && (
                <p className="mt-1 text-sm text-red-500">
                  {validationErrors.image}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-primary transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  </div>
                ) : isEdit ? (
                  "Update Event"
                ) : (
                  "Create Event"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventTemplate;
