import { createGlobalStyle } from 'styled-components';

// the `theme` object is comming from our ./themes.js file
export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
  }
  h{
    color: ${({ theme }) => theme.text};
  }
  .blog-content {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
  }
  .blog-content-main{
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
  }
  .blogcards{
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
  }
  .card{
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
  }
  .cardbody{
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
  }
  .card-body,
  .card:hover {
  border-color: ${({ theme }) => theme.card}

}
.blog-feature{
    color: ${({ theme }) => theme.text}

}
.blog-list{
    color: ${({ theme }) => theme.text}

}
.nav-bar{
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text}
}
#git{
    color: ${({ theme }) => theme.text}

}
a{
    color: ${({ theme }) => theme.navlink}

}
.navbar-light .navbar-brand{
 color: ${({ theme }) => theme.text}
}

.glow, .brandlogo {
  font-size: 80px;
  color: ${({ theme }) => theme.text}
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: ${({ theme }) => theme.shadow}
  }
  to {
    text-shadow:  ${({ theme }) => theme.shadow2}
  }
}
`