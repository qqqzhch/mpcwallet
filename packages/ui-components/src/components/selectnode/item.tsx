const Item = () => {
  return (
    <div className="container mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="w-full mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">node NAME</h2>
          <h1 className="text-gray-900  title-font font-medium mb-1">The Catcher in the Rye</h1>
          <div className="flex mb-4">
            <span className="flex items-left">
              <span className="text-gray-600 ml-1">3 days </span>
            </span>
            <span className="flex items-left">
              <span className="text-gray-600 ml-1">3 user</span>
            </span>
            <span className="flex items-left">
              <span className="text-gray-600 ml-1">3 tx</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
