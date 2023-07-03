export default {
  warp: {
    contract() {
      return {
        setEvaluationOptions() {
          return {
            readState() {
              return Promise.resolve({
                cachedValue: {
                  state: {
                    bounties: {
                      1: {
                        name: 'foo',
                        done: false
                      },
                      2: {
                        name: 'bar',
                        done: true
                      },
                      3: {
                        name: 'baz',
                        done: false
                      }
                    }
                  }
                }
              })
            }
          }
        }
      }
    }
  }
}