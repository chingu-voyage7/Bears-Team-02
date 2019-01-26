import React from 'react'
import MoreCategories from './MoreCategories'

class Categories extends React.Component {
  state = {
    open: false,
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <>
        <div className="categorys-holder">
          <button className="categorys-button">
            <svg viewBox="0 0 128 128">
              <path
                fill="#61dafb"
                d="M64 81.7c7.3 7.1 14.5 11.3 20.3 11.3 1.9 0 3.7-.4 5.2-1.3 5.2-3 7.1-10.5 5.3-21.2-.3-1.9-.7-3.8-1.2-5.8 2-.6 3.8-1.2 5.6-1.8 10.1-3.9 15.7-9.3 15.7-15.2 0-6-5.6-11.4-15.7-15.2-1.8-.7-3.6-1.3-5.6-1.8.5-2 .9-3.9 1.2-5.8 1.7-10.9-.2-18.5-5.4-21.5-1.5-.9-3.3-1.3-5.2-1.3-5.7 0-13 4.2-20.3 11.3-7.2-7.1-14.4-11.3-20.2-11.3-1.9 0-3.7.4-5.2 1.3-5.2 3-7.1 10.5-5.3 21.2.3 1.9.7 3.8 1.2 5.8-2 .6-3.8 1.2-5.6 1.8-10.1 3.9-15.7 9.3-15.7 15.2 0 6 5.6 11.4 15.7 15.2 1.8.7 3.6 1.3 5.6 1.8-.5 2-.9 3.9-1.2 5.8-1.7 10.7.2 18.3 5.3 21.2 1.5.9 3.3 1.3 5.2 1.3 5.8.2 13-4 20.3-11zm-5.6-13.5c1.8.1 3.7.1 5.6.1 1.9 0 3.8 0 5.6-.1-1.8 2.4-3.7 4.6-5.6 6.7-1.9-2.1-3.8-4.3-5.6-6.7zm-12.4-10.3c1 1.7 1.9 3.3 3 4.9-3.1-.4-6-.9-8.8-1.5.9-2.7 1.9-5.5 3.1-8.3.8 1.6 1.7 3.3 2.7 4.9zm-5.8-24.1c2.8-.6 5.7-1.1 8.8-1.5-1 1.6-2 3.2-3 4.9-1 1.7-1.9 3.3-2.7 5-1.3-2.9-2.3-5.7-3.1-8.4zm5.5 13.7c1.3-2.7 2.7-5.4 4.3-8.1 1.5-2.6 3.2-5.2 4.9-7.8 3-.2 6-.3 9.1-.3 3.2 0 6.2.1 9.1.3 1.8 2.6 3.4 5.2 4.9 7.8 1.6 2.7 3 5.4 4.3 8.1-1.3 2.7-2.7 5.4-4.3 8.1-1.5 2.6-3.2 5.2-4.9 7.8-3 .2-6 .3-9.1.3-3.2 0-6.2-.1-9.1-.3-1.8-2.6-3.4-5.2-4.9-7.8-1.6-2.7-3-5.4-4.3-8.1zm39.1-5.4l-2.7-5c-1-1.7-1.9-3.3-3-4.9 3.1.4 6 .9 8.8 1.5-.9 2.8-1.9 5.6-3.1 8.4zm0 10.8c1.2 2.8 2.2 5.6 3.1 8.3-2.8.6-5.7 1.1-8.8 1.5 1-1.6 2-3.2 3-4.9.9-1.5 1.8-3.2 2.7-4.9zm2.3 34.7c-.8.5-1.8.7-2.9.7-4.9 0-11-4-17-10 2.9-3.1 5.7-6.6 8.5-10.5 4.7-.4 9.2-1.1 13.4-2.1.5 1.8.8 3.6 1.1 5.4 1.4 8.5.3 14.6-3.1 16.5zm5.2-52.7c11.2 3.2 17.9 8.1 17.9 12.6 0 3.9-4.6 7.8-12.7 10.9-1.6.6-3.4 1.2-5.2 1.7-1.3-4.1-2.9-8.3-4.9-12.6 2-4.3 3.7-8.5 4.9-12.6zm-8-28.2c1.1 0 2 .2 2.9.7 3.3 1.9 4.5 7.9 3.1 16.5-.3 1.7-.7 3.5-1.1 5.4-4.2-.9-8.7-1.6-13.4-2.1-2.7-3.9-5.6-7.4-8.5-10.5 6-5.9 12.1-10 17-10zm-14.7 20.1c-1.8-.1-3.7-.1-5.6-.1s-3.8 0-5.6.1c1.8-2.4 3.7-4.6 5.6-6.7 1.9 2.1 3.8 4.4 5.6 6.7zm-28.7-19.4c.8-.5 1.8-.7 2.9-.7 4.9 0 11 4 17 10-2.9 3.1-5.7 6.6-8.5 10.5-4.7.4-9.2 1.1-13.4 2.1-.5-1.8-.8-3.6-1.1-5.4-1.4-8.5-.3-14.5 3.1-16.5zm-5.2 52.7c-11.2-3.2-17.9-8.1-17.9-12.6 0-3.9 4.6-7.8 12.7-10.9 1.6-.6 3.4-1.2 5.2-1.7 1.3 4.1 2.9 8.3 4.9 12.6-2 4.3-3.7 8.6-4.9 12.6zm2.1 11c.3-1.7.7-3.5 1.1-5.4 4.2.9 8.7 1.6 13.4 2.1 2.7 3.9 5.6 7.4 8.5 10.5-6 5.9-12.1 10-17 10-1.1 0-2-.2-2.9-.7-3.4-1.9-4.5-8-3.1-16.5zM33.6 112.3c2.2-2.7 2.3-5.7 1.1-8.7-1.2-3-3.7-4.4-6.8-4.5-3.7-.1-7.5 0-11.2 0h-.7v25.9h3v-9.8h4.7c.6 0 1.1.2 1.4.7l6 9.3c.1.2.4.5.6.5h3.9c-2.4-3.7-4.7-7.2-7.1-10.8 2.1-.3 3.9-1 5.1-2.6zm-14.6-.2v-9.9h1.1c2.3 0 4.7-.1 7 .1 2.7.1 4.6 2.2 4.6 4.9s-2.2 4.8-4.9 4.9c-2.4.1-4.8 0-7.8 0zM57.7 113.4c-1.6-7-8-8.8-12.9-6.6-3.8 1.7-5.5 5-5.6 9.1-.1 3.1.8 5.9 3.2 8 2.7 2.4 6 2.7 9.4 2.1 1.9-.4 3.6-1.3 4.9-2.7-.5-.7-1-1.4-1.5-2-2.8 2.4-5.9 3.2-9.3 1.6-2.2-1.1-3.3-3.8-3.5-5.8h15.5v-1.3c.1-.9 0-1.7-.2-2.4zm-15.1 1.6c-.3-3 2.7-6.2 6-6.2 3.8-.1 6.2 2.2 6.3 6.2h-12.3zM73.3 106.3c-1.5-.3-3.1-.4-4.6-.3-2.4.2-4.5 1.3-6.2 3.1.5.7.9 1.4 1.5 2.2.2-.2.4-.4.6-.5 1.6-1.5 3.5-2.3 5.8-2.1 1.8.1 3.5.7 4 2.5.4 1.4.3 2.9.4 4.4-.3 0-.4-.1-.5-.2-2.4-2-5.1-2.4-8-1.7-2.7.7-4.4 2.8-4.6 5.5-.2 3.1 1.2 5.4 3.9 6.5 1.7.7 3.6.7 5.4.3 1.4-.3 2-1.1 4-2.2v1.3h2.8c0-4 .1-8.9 0-13.5 0-2.9-1.7-4.7-4.5-5.3zm1.4 12.6c-.1.3 0 .6 0 .9 0 2.1-.5 2.8-2.5 3.6-1.4.5-2.9.7-4.4.2-1.7-.5-2.9-2-2.9-3.7-.1-1.7 1-3.4 2.7-3.9 2.3-.8 4.4-.3 6.3 1.1.6.5 1 1 .8 1.8zM90.3 109c2.6-.8 5-.3 6.8 1.9l.3.2c.7-.6 1.3-1.2 2.1-1.9-.3-.3-.4-.5-.6-.8-2.9-3.1-8.6-3.5-12.1-1-4.9 3.6-4.8 10.6-2.4 14.3 2.3 3.5 5.6 4.7 9.5 4.2 2.3-.3 4.2-1.4 5.7-3.3-.7-.6-1.4-1.2-2.1-1.9-.2.2-.3.3-.4.5-2.7 3-7.2 2.7-9.6-.5-1.4-1.9-1.7-4.1-1.3-6.3.2-2.5 1.5-4.5 4.1-5.4zM111.1 122.6c-.2.1-.3.2-.3.2-.8.6-1.6.7-2.5.4-.9-.4-1-1.2-1.1-2v-11.4c0-.2 0 .2.1-.8h3.8v-3h-4v-5h-3v5.4h-2.6c-.2 0-.5.2-.5.4-.1.7 0 1.2 0 2.2h3.2v12.799999999999999c0 1.6.4 3 1.8 3.8 1.5.9 4.4.7 5.7-.4.2-.1.3-.5.3-.6-.3-.6-.6-1.3-.9-2z"
              />
            </svg>
          </button>
          <button className="categorys-button">
            <svg viewBox="0 0 128 128">
              <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185h-125.184z" />
              <path
                fill="#323330"
                d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zm-46.885-37.793h-11.709l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
              />
            </svg>
          </button>
          <button className="categorys-button">
            <svg viewBox="0 0 128 128">
              <path
                fill="#E44D26"
                d="M27.854 116.354l-8.043-90.211h88.378l-8.051 90.197-36.192 10.033z"
              />
              <path fill="#F16529" d="M64 118.704l29.244-8.108 6.881-77.076h-36.125z" />
              <path
                fill="#EBEBEB"
                d="M64 66.978h-14.641l-1.01-11.331h15.651v-11.064h-27.743l.264 2.969 2.72 30.489h24.759zM64 95.711l-.049.013-12.321-3.328-.788-8.823h-11.107l1.55 17.372 22.664 6.292.051-.015z"
              />
              <path d="M28.034 1.627h5.622v5.556h5.144v-5.556h5.623v16.822h-5.623v-5.633h-5.143v5.633h-5.623v-16.822zM51.816 7.206h-4.95v-5.579h15.525v5.579h-4.952v11.243h-5.623v-11.243zM64.855 1.627h5.862l3.607 5.911 3.603-5.911h5.865v16.822h-5.601v-8.338l-3.867 5.981h-.098l-3.87-5.981v8.338h-5.502v-16.822zM86.591 1.627h5.624v11.262h7.907v5.561h-13.531v-16.823z" />
              <path
                fill="#fff"
                d="M63.962 66.978v11.063h13.624l-1.284 14.349-12.34 3.331v11.51l22.682-6.286.166-1.87 2.6-29.127.27-2.97h-2.982zM63.962 44.583v11.064h26.725l.221-2.487.505-5.608.265-2.969z"
              />
            </svg>
          </button>
          <button className="categorys-button">
            <svg viewBox="0 0 128 128">
              <path
                fill="#131313"
                d="M89.234 5.856h-7.384l7.679 8.333v3.967h-15.816v-4.645h7.678l-7.678-8.333v-3.971h15.521v4.649zm-18.657 0h-7.384l7.679 8.333v3.967h-15.817v-4.645h7.679l-7.679-8.333v-3.971h15.522v4.649zm-18.474.19h-7.968v7.271h7.968v4.839h-13.632v-16.949h13.632v4.839z"
              />
              <path
                fill="#1572B6"
                d="M27.613 116.706l-8.097-90.813h88.967l-8.104 90.798-36.434 10.102-36.332-10.087z"
              />
              <path fill="#33A9DC" d="M64.001 119.072l29.439-8.162 6.926-77.591h-36.365v85.753z" />
              <path
                fill="#fff"
                d="M64 66.22h14.738l1.019-11.405h-15.757v-11.138h27.929000000000002l-.267 2.988-2.737 30.692h-24.925v-11.137z"
              />
              <path
                fill="#EBEBEB"
                d="M64.067 95.146l-.049.014-12.404-3.35-.794-8.883h-11.178999999999998l1.561 17.488 22.814 6.333.052-.015v-11.587z"
              />
              <path
                fill="#fff"
                d="M77.792 76.886l-1.342 14.916-12.422 3.353v11.588l22.833-6.328.168-1.882 1.938-21.647h-11.175z"
              />
              <path
                fill="#EBEBEB"
                d="M64.039 43.677v11.136999999999999h-26.903000000000002l-.224-2.503-.507-5.646-.267-2.988h27.901zM64 66.221v11.138h-12.247l-.223-2.503-.508-5.647-.267-2.988h13.245z"
              />
            </svg>
          </button>
          <button className="categorys-button">
            <svg viewBox="0 0 128 128">
              <path
                fill="#FFD845"
                d="M40 68v-10.079c0-6.973 6.218-12.921 13.383-12.921h21.102c5.874 0 9.515-5.04 9.515-10.938v-20.117c0-5.726-4.306-10.026-10.04-10.981-3.629-.604-7.131-.879-10.743-.862-3.611.017-7.339.324-10.374.862-8.941 1.578-10.843 4.884-10.843 10.981v8.055h21v3h-28.108999999999998c-6.14 0-11.516 3.53-13.198 10.552-1.939 8.047-2.025 13.202 0 21.605 1.502 6.254 5.089 10.843 11.228 10.843h7.079zm12.054-51.372c-2.19 0-3.964-1.795-3.964-4.013 0-2.229 1.773-4.039 3.964-4.039 2.182 0 3.964 1.811 3.964 4.039 0 2.218-1.782 4.013-3.964 4.013zM106.175 35.552c-1.517-6.114-4.416-10.552-10.563-10.552h-8.612v9.062c0 7.273-5.484 13.938-12.515 13.938h-21.102c-5.78 0-11.383 4.403-11.383 10.193v20.117c0 5.725 5.388 9.093 10.974 10.734 6.686 1.967 12.781 2.322 20.782 0 5.318-1.54 10.244-4.638 10.244-10.734v-7.31h-21v-3h32.611c6.14 0 8.428-4.416 10.563-10.843 2.206-6.618 2.112-13.115.001-21.605zm-30.361 40.073c2.19 0 3.965 1.795 3.965 4.015 0 2.227-1.774 4.037-3.965 4.037-2.182 0-3.963-1.811-3.963-4.037 0-2.22 1.781-4.015 3.963-4.015z"
              />
              <path
                fill="#FFD845"
                d="M34.911 112.049c0-3.757-1.072-5.686-3.214-5.791-.853-.041-1.685.095-2.495.409-.646.231-1.082.461-1.311.692v8.968c1.371.86 2.588 1.26 3.649 1.197 2.247-.148 3.371-1.971 3.371-5.475zm2.643.157c0 1.909-.447 3.493-1.348 4.753-1.003 1.427-2.394 2.16-4.172 2.201-1.34.043-2.721-.378-4.142-1.258v8.151l-2.298-.82v-18.093c.377-.462.862-.859 1.451-1.196 1.368-.798 3.031-1.207 4.987-1.228l.033.032c1.788-.022 3.166.712 4.134 2.201.902 1.366 1.355 3.117 1.355 5.257z"
              />
              <path
                fill="#FFD845"
                d="M51.603 117.555c0 2.56-.257 4.333-.77 5.318-.516.986-1.497 1.773-2.945 2.359-1.174.463-2.444.714-3.808.757l-.38-1.448c1.386-.188 2.362-.378 2.928-.566 1.114-.377 1.878-.955 2.298-1.73.337-.631.503-1.835.503-3.618v-.599c-1.571.714-3.219 1.068-4.941 1.068-1.132 0-2.13-.354-2.99-1.068-.966-.777-1.449-1.764-1.449-2.958v-9.566l2.299-.787v9.63c0 1.028.332 1.82.996 2.376s1.524.822 2.578.803c1.054-.022 2.183-.431 3.382-1.228v-11.234h2.299v12.491z"
              />
              <path
                fill="#FFD845"
                d="M60.576 119.034c-.274.022-.525.032-.757.032-1.3 0-2.314-.309-3.038-.93-.722-.622-1.084-1.479-1.084-2.573v-9.054h-1.574v-1.446h1.574v-3.84l2.296-.817v4.657h2.583v1.446h-2.583v8.991c0 .862.231 1.474.694 1.83.397.295 1.029.463 1.889.506v1.198z"
              />
              <path
                fill="#FFD845"
                d="M74.493 118.845h-2.298v-8.873c0-.902-.211-1.68-.631-2.329-.485-.734-1.159-1.102-2.024-1.102-1.054 0-2.372.556-3.954 1.668v10.636h-2.298v-21.208l2.298-.725v9.659c1.469-1.068 3.073-1.604 4.816-1.604 1.218 0 2.203.41 2.958 1.228.757.817 1.134 1.836 1.134 3.053v9.597h-.001z"
              />
              <path
                fill="#FFD845"
                d="M86.711 111.688c0-1.444-.274-2.636-.82-3.579-.649-1.149-1.657-1.756-3.021-1.818-2.52.146-3.778 1.951-3.778 5.412 0 1.587.262 2.912.79 3.976.674 1.356 1.685 2.024 3.033 2.002 2.531-.02 3.796-2.017 3.796-5.993zm2.518.015c0 2.055-.526 3.765-1.575 5.131-1.154 1.528-2.749 2.296-4.783 2.296-2.017 0-3.589-.768-4.723-2.296-1.028-1.366-1.542-3.076-1.542-5.131 0-1.932.556-3.556 1.668-4.879 1.174-1.403 2.718-2.107 4.627-2.107 1.909 0 3.463.704 4.66 2.107 1.111 1.323 1.668 2.947 1.668 4.879z"
              />
              <path
                fill="#FFD845"
                d="M102.407 118.845h-2.299v-9.376c0-1.028-.31-1.831-.928-2.409-.619-.576-1.443-.855-2.472-.833-1.091.021-2.13.378-3.116 1.069v11.549h-2.299v-11.833c1.323-.963 2.54-1.592 3.652-1.886 1.049-.274 1.974-.41 2.771-.41.545 0 1.059.053 1.542.158.903.209 1.637.596 2.203 1.164.631.629.946 1.384.946 2.267v10.54z"
              />
            </svg>
          </button>
          <button className="categorys-button">
            <svg viewBox="0 0 128 128">
              <path
                fill="#0074BD"
                d="M52.581 67.817s-3.284 1.911 2.341 2.557c6.814.778 10.297.666 17.805-.753 0 0 1.979 1.237 4.735 2.309-16.836 7.213-38.104-.418-24.881-4.113zM50.522 58.402s-3.684 2.729 1.945 3.311c7.28.751 13.027.813 22.979-1.103 0 0 1.373 1.396 3.536 2.157-20.352 5.954-43.021.469-28.46-4.365z"
              />
              <path
                fill="#EA2D2E"
                d="M67.865 42.431c4.151 4.778-1.088 9.074-1.088 9.074s10.533-5.437 5.696-12.248c-4.519-6.349-7.982-9.502 10.771-20.378.001 0-29.438 7.35-15.379 23.552z"
              />
              <path
                fill="#0074BD"
                d="M90.132 74.781s2.432 2.005-2.678 3.555c-9.716 2.943-40.444 3.831-48.979.117-3.066-1.335 2.687-3.187 4.496-3.576 1.887-.409 2.965-.334 2.965-.334-3.412-2.403-22.055 4.719-9.469 6.762 34.324 5.563 62.567-2.506 53.665-6.524zM54.162 48.647s-15.629 3.713-5.534 5.063c4.264.57 12.758.439 20.676-.225 6.469-.543 12.961-1.704 12.961-1.704s-2.279.978-3.93 2.104c-15.874 4.175-46.533 2.23-37.706-2.038 7.463-3.611 13.533-3.2 13.533-3.2zM82.2 64.317c16.135-8.382 8.674-16.438 3.467-15.353-1.273.266-1.845.496-1.845.496s.475-.744 1.378-1.063c10.302-3.62 18.223 10.681-3.322 16.345 0 0 .247-.224.322-.425z"
              />
              <path
                fill="#EA2D2E"
                d="M72.474 1.313s8.935 8.939-8.476 22.682c-13.962 11.027-3.184 17.313-.006 24.498-8.15-7.354-14.128-13.828-10.118-19.852 5.889-8.842 22.204-13.131 18.6-27.328z"
              />
              <path
                fill="#0074BD"
                d="M55.749 87.039c15.484.99 39.269-.551 39.832-7.878 0 0-1.082 2.777-12.799 4.981-13.218 2.488-29.523 2.199-39.191.603 0 0 1.98 1.64 12.158 2.294z"
              />
              <path
                fill="#EA2D2E"
                d="M94.866 100.181h-.472v-.264h1.27v.264h-.47v1.317h-.329l.001-1.317zm2.535.066h-.006l-.468 1.251h-.216l-.465-1.251h-.005v1.251h-.312v-1.581h.457l.431 1.119.432-1.119h.454v1.581h-.302v-1.251zM53.211 115.037c-1.46 1.266-3.004 1.978-4.391 1.978-1.974 0-3.045-1.186-3.045-3.085 0-2.055 1.146-3.56 5.738-3.56h1.697v4.667h.001zm4.031 4.548v-14.077c0-3.599-2.053-5.973-6.997-5.973-2.886 0-5.416.714-7.473 1.622l.592 2.493c1.62-.595 3.715-1.147 5.771-1.147 2.85 0 4.075 1.147 4.075 3.521v1.779h-1.424c-6.921 0-10.044 2.685-10.044 6.723 0 3.479 2.058 5.456 5.933 5.456 2.49 0 4.351-1.028 6.088-2.533l.316 2.137h3.163v-.001zM70.694 119.585h-5.027l-6.051-19.689h4.391l3.756 12.099.835 3.635c1.896-5.258 3.24-10.596 3.912-15.733h4.271c-1.143 6.481-3.203 13.598-6.087 19.688zM89.982 115.037c-1.465 1.266-3.01 1.978-4.392 1.978-1.976 0-3.046-1.186-3.046-3.085 0-2.055 1.149-3.56 5.736-3.56h1.701v4.667h.001zm4.033 4.548v-14.077c0-3.599-2.059-5.973-6.999-5.973-2.889 0-5.418.714-7.475 1.622l.593 2.493c1.62-.595 3.718-1.147 5.774-1.147 2.846 0 4.074 1.147 4.074 3.521v1.779h-1.424c-6.923 0-10.045 2.685-10.045 6.723 0 3.479 2.056 5.456 5.93 5.456 2.491 0 4.349-1.028 6.091-2.533l.318 2.137h3.163v-.001zM37.322 122.931c-1.147 1.679-3.005 3.008-5.037 3.757l-1.989-2.345c1.547-.794 2.872-2.075 3.489-3.269.532-1.063.753-2.43.753-5.701v-22.482h4.284v22.173c0 4.375-.348 6.144-1.5 7.867z"
              />
            </svg>
          </button>
          <button className="categorys-button">
            <svg viewBox="0 0 128 128">
              <path
                fill="#D91404"
                d="M82.518 54.655c-12.92 8.326-25.722 16.577-38.862 25.043 19.678 2.687 39.005 5.325 58.715 8.016-6.714-11.181-13.256-22.074-19.853-33.059zM107.927 17.812c-1.735 2.604-3.473 5.207-5.205 7.813-5.95 8.951-11.898 17.901-17.841 26.855-.331.5-.76.896-.294 1.664 5.744 9.483 11.441 18.996 17.152 28.498.901 1.501 1.813 2.996 2.979 4.436l3.463-69.191-.254-.075zM29.529 47.38c.269.255.94.402 1.251.249 5.509-2.708 11.053-5.355 16.442-8.286 1.756-.954 3.106-2.667 4.621-4.055 5.013-4.597 10.017-9.204 15.021-13.812.307-.283.668-.556.852-.913 1.797-3.513 3.562-7.042 5.391-10.675-2.181-.817-4.248-1.62-6.34-2.35-.284-.099-.73.098-1.04.27-4.843 2.706-9.777 5.267-14.467 8.218-2.347 1.476-4.259 3.651-6.337 5.547-3.347 3.056-6.692 6.119-9.992 9.229-.876.825-1.674 1.768-2.355 2.76-2.258 3.286-4.446 6.619-6.737 10.048 1.282 1.326 2.445 2.592 3.69 3.77zM49.662 42.887c-2.739 11.577-5.465 23.088-8.279 34.978 13.199-8.504 26.093-16.812 38.901-25.065-10.193-3.3-20.354-6.589-30.622-9.913zM71.499 23.446l11.22 27.292c7.324-11.001 14.502-21.785 21.843-32.815-11.151 1.863-22.036 3.681-33.063 5.523zM50.122 40.519c10.042 3.261 19.885 6.456 30.012 9.743-3.761-9.163-7.393-18.005-11.101-27.035l-18.911 17.292zM29.944 54.131l-10.504 25.109c6.731-.199 13.257-.392 20.005-.591-3.168-8.176-6.274-16.192-9.501-24.518zM39.683 72.826l.248-.054c2.401-9.988 4.838-19.907 7.291-30.284-5.47 2.842-10.688 5.554-16.05 8.341 2.735 7.112 5.653 14.612 8.511 21.997zM100.525 16.304c-3.195-.846-6.387-1.696-9.585-2.536-4.593-1.207-9.19-2.401-13.781-3.62-.573-.152-.989-.251-1.326.44-1.622 3.324-3.296 6.624-4.944 9.935-.051.103-.041.237-.08.492 9.948-1.507 19.83-3.005 29.71-4.502l.006-.209zM81.993 8.742c8.579 2.374 17.158 4.747 26.037 7.203l-4.302-12.258c-7.29 1.617-14.493 3.214-21.696 4.811l-.039.244zM89.875 88.1l-21.361-2.916c-8.873-1.211-17.73-2.544-26.623-3.569-3.225-.371-6.536-.029-9.806.026-2.687.046-5.374.148-8.06.233-.277.008-.553.064-.828.361 22.21 2.054 44.422 4.107 66.631 6.162l.047-.297zM19.878 71.576c2.864-6.641 5.712-13.287 8.586-19.922.288-.667.267-1.118-.296-1.653-1.203-1.145-2.319-2.378-3.634-3.744l-5.241 25.871.193.092c.133-.214.294-.414.392-.644zM76.29 6.989c4.827-1.246 9.724-2.218 14.592-3.305.314-.071.622-.175.932-.264l-.047-.238-20.916 2.813c1.965.859 3.478 1.5 5.439.994zM30.975 109.422v8.547h-4.724v-22.277h6.491c3.026 0 5.266.551 6.719 1.653s2.18 2.776 2.18 5.02c0 1.311-.361 2.477-1.083 3.497-.721 1.021-1.741 1.822-3.063 2.401l6.553 9.705h-5.242l-5.317-8.547h-2.514zm0-3.84h1.524c1.492 0 2.595-.25 3.306-.747.71-.498 1.066-1.28 1.066-2.346 0-1.057-.363-1.808-1.09-2.255-.726-.447-1.851-.671-3.374-.671h-1.433v6.019zM58.553 117.969l-.624-2.179h-.244c-.498.793-1.204 1.404-2.117 1.836-.915.432-1.957.647-3.124.647-2.002 0-3.51-.535-4.526-1.607s-1.523-2.613-1.523-4.624v-11.108h4.647v9.95c0 1.229.219 2.151.656 2.766.436.615 1.131.921 2.086.921 1.301 0 2.24-.435 2.819-1.302.579-.869.869-2.308.869-4.319v-8.015h4.647v17.035h-3.566zM76.472 100.613c2.011 0 3.586.786 4.725 2.355 1.137 1.569 1.705 3.72 1.705 6.453 0 2.813-.587 4.992-1.759 6.535-1.174 1.545-2.771 2.316-4.793 2.316-2.001 0-3.57-.727-4.708-2.18h-.32l-.776 1.875h-3.551v-23.707h4.647v5.516c0 .701-.062 1.823-.184 3.368h.184c1.086-1.686 2.697-2.531 4.83-2.531zm-1.494 3.719c-1.147 0-1.985.353-2.513 1.059-.528.707-.804 1.872-.823 3.498v.502c0 1.829.271 3.139.814 3.932.544.792 1.405 1.188 2.584 1.188.954 0 1.713-.44 2.277-1.318s.846-2.156.846-3.832c0-1.676-.285-2.934-.854-3.772-.568-.838-1.345-1.257-2.331-1.257zM83.999 100.934h5.089l3.215 9.584c.274.833.463 1.818.563 2.956h.092c.111-1.046.329-2.032.654-2.956l3.154-9.584h4.982l-7.207 19.214c-.66 1.777-1.602 3.108-2.825 3.992-1.225.884-2.654 1.325-4.29 1.325-.803 0-1.59-.086-2.361-.259v-3.687c.559.131 1.168.197 1.828.197.822 0 1.541-.251 2.156-.754.615-.502 1.095-1.261 1.439-2.277l.274-.839-6.763-16.912z"
              />
            </svg>
          </button>
          <button className="categorys-button" onClick={this.handleClick}>
            Other
          </button>
        </div>
        <MoreCategories open={this.state.open} />
      </>
    )
  }
}

export default Categories
