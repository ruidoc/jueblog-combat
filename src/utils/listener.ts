export class Listener {
  private emiter: Record<string, Function[]> = {}
  apply(event: string, fun: (...args: any[]) => void) {
    if (!this.emiter[event]) {
      this.emiter[event] = []
    }
    this.emiter[event].push(fun)
  }
  emit(event: string, args?: any) {
    if (this.emiter[event]) {
      this.emiter[event].forEach(fun => fun(args))
    }
  }
}
